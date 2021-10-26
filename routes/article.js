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

    const articles = [];

    /**
     * Create article
     */
    router.post('/article', async (req, res) => {
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
    router.get('/article', async (req, res) => {
        res.status(200).json({success: true, articles});
    });

    /**
     * Get specific article
     */
    router.get('/article', async (req, res) => {

    });

    return router;
}