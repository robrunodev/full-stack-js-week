import linkModel, { ILinkModel } from './link-model';
import { Link } from './link';

class LinkRepositotry {

    async findByCode(code: string): Promise<ILinkModel | null> {
        return await linkModel.findOne<ILinkModel>({ where: { code } });
    }

    async add(link: Link): Promise<ILinkModel> {
        return await linkModel.create<ILinkModel>(link);
    }

    async hit(code: string): Promise<ILinkModel | null> {
        const link = await this.findByCode(code);
        if (!link) {
            return null
        }

        link.hits!++;
        await link.save();
        return link;
    }
}

export default LinkRepositotry;

