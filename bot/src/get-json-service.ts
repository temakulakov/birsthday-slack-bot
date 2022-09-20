//@ts-ignore
import needle from 'needle';

const DELAY = 100 * 60 * 60 * 24 // 1 день

export default new class GetJsonService {
    private interval: Object = {};
    private json: Array<Object> = [];
    async start() {
        await this.fetchData();
        this.interval = setInterval(this.fetchData, DELAY)
    }
    async fetchData() {
        try {
            await needle.post( 'http://127.0.0.1:1337/api/getjson', {director: ["Beatrice", "Bianca", "Giacomo"]}, { json: true }, (err: Error, resp: Response | undefined) => {
                if (err) {
                    console.log(err)
                }

                if (resp != undefined && resp.body != null) {
                    //@ts-ignore
                    this.json = resp.body;
                    console.log(resp.body);
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
}