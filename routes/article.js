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
        {id: 1, title: "test1", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test", tags: ["1", "2", "3"], username: "me" },
        {id: 2, title: "test2", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["2"], username: "me" },
        {id: 3, title: "test3", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test3", tags: ["1"], username: "me" },
        {id: 4, title: "test4", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test2", tags: ["3"], username: "me" },
        {id: 5, title: "test5", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["4"], username: "me" },
        {id: 6, title: "test6", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test4", tags: ["1"], username: "me" },
        {id: 7, title: "test7", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test", tags: ["1", "2", "3"], username: "me" },
        {id: 8, title: "test8", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["2"], username: "me" },
        {id: 9, title: "test9", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test3", tags: ["1"], username: "me" },
        {id: 10, title: "test10", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test2", tags: ["3"], username: "me" },
        {id: 11, title: "test11", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["4"], username: "me" },
        {id: 12, title: "test12", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test4", tags: ["1"], username: "me" },
        {id: 13, title: "test13", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test", tags: ["1", "2", "3"], username: "me" },
        {id: 14, title: "test14", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["2"], username: "me" },
        {id: 15, title: "test15", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test3", tags: ["1"], username: "me" },
        {id: 16, title: "test16", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test2", tags: ["3"], username: "me" },
        {id: 17, title: "test17", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["4"], username: "me" },
        {id: 18, title: "test18", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test4", tags: ["1"], username: "me" },
        {id: 9, title: "test9", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test3", tags: ["1"], username: "me" },
        {id: 10, title: "test10", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test2", tags: ["3"], username: "me" },
        {id: 11, title: "test11", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["4"], username: "me" },
        {id: 12, title: "test12", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test4", tags: ["1"], username: "me" },
        {id: 13, title: "test13", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test", tags: ["1", "2", "3"], username: "me" },
        {id: 14, title: "test14", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["2"], username: "me" },
        {id: 15, title: "test15", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test3", tags: ["1"], username: "me" },
        {id: 16, title: "test16", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test2", tags: ["3"], username: "me" },
        {id: 17, title: "test17", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["4"], username: "me" },
        {id: 18, title: "test18", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test4", tags: ["1"], username: "me" },
        {id: 9, title: "test9", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test3", tags: ["1"], username: "me" },
        {id: 10, title: "test10", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test2", tags: ["3"], username: "me" },
        {id: 11, title: "test11", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["4"], username: "me" },
        {id: 12, title: "test12", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test4", tags: ["1"], username: "me" },
        {id: 13, title: "test13", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test", tags: ["1", "2", "3"], username: "me" },
        {id: 14, title: "test14", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["2"], username: "me" },
        {id: 15, title: "test15", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test3", tags: ["1"], username: "me" },
        {id: 16, title: "test16", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test2", tags: ["3"], username: "me" },
        {id: 17, title: "test17", summary: "sample summary", content: "<h1>Bla bla bla</h1>", date: new Date(), category: "test", tags: ["4"], username: "me" },
        {id: 18, title: "test18", summary: "sample summary", content: "<h1>Bla bla bla</h1>", image: "https://material.angular.io/assets/img/examples/shiba2.jpg", date: new Date(), category: "test4", tags: ["1"], username: "me" },
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
     * if query param of id is provided return specific article
     * if query param of tag is not empty string return articles with the tag
     * if query param of category is not empty string return articles with the category
     */
    router.get('', async (req, res) => {
        const { limit, offset, id, tag, category } = req.query;
        const articlesSlice = articles.slice(parseInt(offset), parseInt(offset)+parseInt(limit));

        if (id) {
            const article = articles.find(article => article.id == id);
            return res.status(200).json({success: true, article});
        }

        if ( tag != '' ) {
            console.log(tag.toString());
            const articlesSlice = articles.filter(article => article.tags.includes(tag)).slice(parseInt(offset), parseInt(offset)+parseInt(limit));
            return res.status(200).json({success: true, articlesSlice});
        }

        if ( category != '' ) {
            console.log(articles[0].category);
            // console.log(category)
            const articlesSlice = articles.filter(article => article.category == category.toString()).slice(parseInt(offset), parseInt(offset)+parseInt(limit));
            return res.status(200).json({success: true, articlesSlice});
        }

        res.status(200).json({success: true, articlesSlice});
    });

    /**
     * Get total number of articles
     */
    router.get('/length', async (req, res) => {  
        let length = articles.length; 
        const { tag, category } = req.query;

        if ( tag != '') {
            length = articles.filter(article => article.tags.includes(tag)).length;
        }

        if ( category != '') {
            length = articles.filter(article => article.category == category).length;
        }
        
        res.status(200).json({success: true, length});
    });

    /**
     * Get a map of the tags
     */
    router.get('/tags', async (req, res) => {  
        const tags = {};
        articles.map( article => {
            for(tag in article.tags) {
                if (tags[tag] == null)  tags[tag] = 1
                else tags[tag]++;
            }
        }); 
        res.status(200).json({success: true, tags});
    });

    /**
     * Get a map of the categories
     */
    router.get('/categories', async (req, res) => {  
        const categories = {};
        articles.map( article => {
            if (categories[article.category] == null)  categories[article.category] = 1
            else categories[article.category]++;
        }); 
        res.status(200).json({success: true, categories});
    });

    return router;
}