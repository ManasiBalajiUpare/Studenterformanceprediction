let app=require("./src/app.js");

const PORT=process.env.port;
app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}/`);
});

