const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const pdf = require("html-pdf")


const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const StringtoHTML = (str) => {
    return str.replace(/^["']|["']$/g, ''); // Removes leading and trailing quotes (single or double)
};


app.post('/pdf', (req, res) => {
    let { html, title } = req.query;
    console.log(html, title);
    html = StringtoHTML(html);
    title = StringtoHTML(title);



    pdf.create(html).toBuffer((err, buffer) => {
        if (err) {
            console.error('Error generating PDF:', err);
        }

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${title}.pdf"`,
        });

        res.send(buffer);
    });

})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});