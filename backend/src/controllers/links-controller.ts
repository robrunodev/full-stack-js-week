import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { Link } from '../models/link';
import LinkRepositotry from '../models/link-repository';

export default class LinkController {
    private linksRepository = new LinkRepositotry();

    public async postLink(request: Request, response: Response) {

        function generateCode(): string {
            let text = '';
            const possible = 'ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijlmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
    
            return text;
        }

        try {
            const link = request.body as Link;
            link.code = generateCode();
            link.hits = 0;
            const linksRepository = new LinkRepositotry();
            const linkRegistered = await linksRepository.add(link);
            response.status(201).json({ linkRegistered });
        } catch (error) {
            response.status(401).json({ "error": error.message });
        }

    };

    public async hitLink(request: Request, response: Response) {

        const { code } = request.params;
        const linksRepository = new LinkRepositotry();

        const link = await linksRepository.hit(code);

        if (!link) {
            return response.status(404).json({ "message": "Link not founded" });
        }

        return response.status(201).json(link);
    };

    public async getLink(request: Request, response: Response) {

        const { code } = request.params;
        const linksRepository = new LinkRepositotry();

        const searchedLink = await linksRepository.findByCode(code);

        if (!searchedLink) {
            return response.status(404).json({ "message": "Link not founded" });
        }

        return response.status(201).json(searchedLink);
    }



}

