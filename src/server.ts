/* eslint-disable react/no-children-prop */
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import bodyParser from 'body-parser';
import { ObjectID } from 'bson';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Route, StaticRouter } from 'react-router';
import App from './App';
import { getPagelessTemplate } from './backend/template';
import { PageModel } from './database/model/Page';
import mongoURI from './database/settings';
import theme from './theme';
import { PostModel } from './database/model/Post';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

async function renderPagelessTemplate(html: string, css: string): Promise<string> {
    return (await getPagelessTemplate(css)).replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div > `,
    );
}

function handleAdminRender(request: express.Request): Promise<string> {
    const sheets = new ServerStyleSheets();
    const html = renderToString(
        sheets.collect(
            React.createElement(
                ThemeProvider,
                {
                    theme,
                    children: React.createElement(
                        StaticRouter,
                        { location: request.url, context: {} },
                        React.createElement(
                            Route,
                            { component: App },
                        ),
                    ),
                },
            ),
        ),
    );

    const css = sheets.toString();

    return renderPagelessTemplate(html, css);
}

const app: express.Application = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/static', express.static(`${__dirname}/public`));
app.use('/static/capa_principal.jpg', (request: express.Request, response: express.Response) => {
    response.sendFile('./dist/public/capa_principal.jpg');
});
app.use('/static/capa_blog.jpg', (request: express.Request, response: express.Response) => {
    response.sendFile('dist/public/capa_blog.jpg');
});

app.get('/pages', async (request: express.Request, response: express.Response) => response.send(await PageModel.find().lean()));
app.get('/pages/:id', async (request: express.Request, response: express.Response) => response.send(await PageModel.findOne({ _id: request.params.id }).lean()));

app.post('/pages', async (request: express.Request, response: express.Response) => {
    const { page } = request.body;
    await PageModel.create({ ...page, _id: new ObjectID() });
    response.status(200).send(page);
});

app.put('/pages/:id', async (request: express.Request, response: express.Response) => {
    const { page } = request.body;
    await PageModel.updateOne({ _id: request.params.id }, { $set: page });
    response.status(200).send(page);
});

app.delete('/pages/:id', async (request: express.Request, response: express.Response) => {
    await PageModel.deleteOne({ _id: request.params.id });
    response.status(200).send();
});

app.get('/posts', async (request: express.Request, response: express.Response) => response.send(await PostModel.find().lean()));
app.get('/posts/:id', async (request: express.Request, response: express.Response) => response.send(await PostModel.findOne({ _id: request.params.id }).lean()));

app.post('/posts', async (request: express.Request, response: express.Response) => {
    const { post } = request.body;
    await PostModel.create({ ...post, _id: new ObjectID() });
    response.status(200).send(post);
});

app.put('/posts/:id', async (request: express.Request, response: express.Response) => {
    const { post } = request.body;
    await PostModel.updateOne({ _id: request.params.id }, { $set: post });
    response.status(200).send(post);
});

app.delete('/posts/:id', async (request: express.Request, response: express.Response) => {
    await PostModel.deleteOne({ _id: request.params.id });
    response.status(200).send();
});

app.get('/*', async (request: express.Request, response: express.Response) => {
    response.send(await handleAdminRender(request));
});


app.listen(process.env.NODE_PORT || 3000);
