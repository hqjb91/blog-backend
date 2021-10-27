const express = require('express');
const router = express.Router();

module.exports = () => {

    /**
     * interface Article {
	 * id: number;
	 * title: string;
	 * summary: string;
	 * content: string;
	 * date: Date;
	 * category: string;
	 * tags: Array<string>;
	 * username: string;
     * }
     */

    const articles = [
        {id: 1, title: "test", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["1", "2", "3"], username: "me" },
        {id: 2, title: "test2", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["2"], username: "me" },
        {id: 3, title: "test3", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test3", tags: ["1"], username: "me" },
        {id: 4, title: "test4", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test2", tags: ["3"], username: "me" },
        {id: 5, title: "test5", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["4"], username: "me" },
        {id: 6, title: "test6", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test4", tags: ["1"], username: "me" }
    ];

    /**
     * Create article
     */
    router.post('', async (req, res) => {
        const { title, summary, content, date, category, tags, username } = req.body;
        articles.push({
            id: articles[articles.lastIndexOf].id+1,
            title, summary, content, date, category, tags, username 
        });
        res.status(200).json({success: true});
    });

    /**
     * Get list of articles
     */
    router.get('', async (req, res) => {
        res.status(200).json({success: true, articles});
    });

    // /**
    //  * Get specific article
    //  */
    // router.get('', async (req, res) => {

    // });

    return router;
}