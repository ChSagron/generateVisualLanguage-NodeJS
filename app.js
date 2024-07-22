import express from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const app = express();
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs',);
});


app.post('/generate', (req, res) => {

    const newPrompts = async () => {

        console.log(req.body);

        let input = req.body;

        const sendPrompt = `
        תן לי שפה חזותית לעסק ש${input.about}
        הוא פונה לקהל יעד ${input.audience}
        ערכי המותג המרכזיים הם: ${input.values} 
        למתחרים הבולטים שלו יש ${input.rival} - המנע ממרכיבים אלה בתשובה
        בנוסף יש לי העדפות אישיות ל${input.preferences}
        התייחס בתשובה למרכיבים קו, צורה, צבע, מרקם, טיפוגרפיה, שפה צילומית. 
        בכל חלק תוסיף סיבה למה זה מתאים לעסק.
        לכל אפשרות תן כותרת שמסכמת את הטון והסגנון באפשרות הנוכחית.
        תשתמש בהרבה מילים! בהסבר ובנימוקים, לא סתם כמה מילים
        תחזיר את התשובה בפורמט JSON
        {
        "hebrew":
            {
            "title": “…”,
            “line”:”…”,
            “shape”: “…”,
            “color”: “...”,
            “texture”: “…”,
            “typography”: “…”,
            “photography”: “…”
            },
        "english":
            {
            "title": “…”,
            "line": "...",
            "shape": "...",
            "color": "...",
            "texture": "...",
            "typography": "...",
            "photography": "..."
            },
        }
        בצורה כפולה- בעברית ובאנגלית`;

        // const sendPrompt = `
        // תן לי 3 אפשרויות לשפה חזותית לעסק ש${input.about}
        // הוא פונה לקהל יעד ${input.audience}
        // ערכי המותג המרכזיים הם: ${input.values} 
        // למתחרים הבולטים שלו יש ${input.rival} - המנע ממרכיבים אלה בתשובה
        // בנוסף יש לי העדפות אישיות ל${input.preferences}
        // התייחס בתשובה למרכיבים קו, צורה, צבע, מרקם, טיפוגרפיה, שפה צילומית. 
        // בכל חלק תוסיף סיבה למה זה מתאים לעסק.
        // לכל אפשרות תן כותרת שמסכמת את הטון והסגנון באפשרות הנוכחית.
        // תשתמש בהרבה מילים! בהסבר ובנימוקים, לא סתם כמה מילים
        // תחזיר את התשובה בפורמט JSON
        // {
        //     "hebrew":
        //     {
        //         “1”: 
        //             {
        //             "title": “…”,
        //             “line”:”…”,
        //             “shape”: “…”,
        //             “color”: “...”,
        //             “texture”: “…”,
        //             “typography”: “…”,
        //             “photography”: “…”
        //             },
        //         “2”: {…},
        //         “3”: {…}
        //     },
        //     "english":
        //     {
        //         "1":{...},
        //         "2":{...},
        //         "3":{...}
        //     }
        // }
        // בצורה כפולה- בעברית ובאנגלית`;

        console.log("sendPrompt: ");
        console.log(sendPrompt);

        const resOpenAI = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: sendPrompt }],
        });

        console.log("resOpenAI: ");
        console.log(resOpenAI);

        let aiRes = resOpenAI.choices[0]?.message?.content;
        console.log("aiRes: ");
        console.log(aiRes);

        let parseRes;
        try {
            parseRes = JSON.parse(aiRes);
        } catch (err) {
            console.log(err);
            return {};
        }
        console.log("parseRes: ");
        console.log(parseRes);

        return parseRes;
    }


    newPrompts().then(resPrompt => {

        console.log("resPrompt: ");
        console.log(resPrompt);
        console.log(Object.keys(resPrompt).length);

        if (resPrompt && Object.keys(resPrompt).length > 0) {
            console.log("render prompts")
            res.render('index.ejs', { content: 'prompts', response: resPrompt, error: undefined });
        }
        else {
            console.log("render error")
            res.render('index.ejs', { content: 'prompts', response: undefined, error: 'Unable to parse response from OpenAI.' });
        }
    });

});

app.listen(process.env.PORT || 3000);
