const express = require('express');
const router = express.Router();

module.exports = () => {

    /**
     * interface Article {
	 * id: number;
	 * title: string;
	 * summary: string;
	 * content: string;
     * image: string;
	 * date: Date;
	 * category: string;
	 * tags: Array<string>;
	 * username: string;
     * }
     */

    const articles = [
        {id: 1, title: "test", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test", tags: ["1", "2", "3"], username: "me" },
        {id: 2, title: "test2", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["2"], username: "me" },
        {id: 3, title: "test3", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test3", tags: ["1"], username: "me" },
        {id: 4, title: "test4", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test2", tags: ["3"], username: "me" },
        {id: 5, title: "test5", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["4"], username: "me" },
        {id: 6, title: "test6", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test4", tags: ["1"], username: "me" },
        {id: 7, title: "test", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test", tags: ["1", "2", "3"], username: "me" },
        {id: 8, title: "test2", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["2"], username: "me" },
        {id: 9, title: "test3", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test3", tags: ["1"], username: "me" },
        {id: 10, title: "test4", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test2", tags: ["3"], username: "me" },
        {id: 11, title: "test5", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["4"], username: "me" },
        {id: 12, title: "test6", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test4", tags: ["1"], username: "me" },
        {id: 13, title: "test", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test", tags: ["1", "2", "3"], username: "me" },
        {id: 14, title: "test2", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["2"], username: "me" },
        {id: 15, title: "test3", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test3", tags: ["1"], username: "me" },
        {id: 16, title: "test4", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test2", tags: ["3"], username: "me" },
        {id: 17, title: "test5", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["4"], username: "me" },
        {id: 18, title: "test6", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test4", tags: ["1"], username: "me" }
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
     * Get list of articles with query params of limit and offset for pagination
     */
    router.get('', async (req, res) => {
        const { limit, offset } = req.query;
        const articlesSlice = articles.slice(offset, offset+limit);

        res.status(200).json({success: true, articlesSlice});
    });

    /**
     * Get specific article by query param of ID
     */
    router.get('', async (req, res) => {
        const { id } = req.query;
        const article = articles.find( article => article.id == id );

        res.status(200).json({success: true, article});
    });

    return router;
}