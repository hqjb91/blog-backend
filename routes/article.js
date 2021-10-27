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
        {id: 1, title: "test", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["1"], username: "me" }
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