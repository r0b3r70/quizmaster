import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {

    data: null, // cached JSON data
    seen: [],   // questions that have been displayed already

    async getData() {
        return (!this.data) 
            ? this.data = api.get('/data').then(res => res.data) 
            : this.data;
    },

    /* Compare the answer "name" based on the id posted
    */    
    async verifyAnswer(inputId, name) {
        return this.getData()
            .then(res => res.find(({id}) => id === +inputId).name === name)
            .catch(err => err)
    },
    
    /* Call getQuestions if we can get the data and not all have been showed yet. 
    */
    async generate() {
        return this.getData().then(items => {
            if(this.seen.length >= items.length) { return [] }
            return this.getQuestions(items);
        });
    },

    /* Get possible questions, define first one as answer and shuffle the order.
    */
    getQuestions(items) {
        const output = this.generateQuestions(this.seen, items);
        const question = output[0];
        this.seen.push(question);

        return this._stripObj({
            answers: this._shuffle(output),
            question
        });
    },

    /*  Generates a set of 4 possible answers. One will be picked as question later on.
    */
    generateQuestions(seen, items) {
        /* Output array */ 
        let arr = [];

        /* Max 4 items */ 
        while (arr.length < 4 && seen.length <= items.length) {

            /*  On first pass, skipp from the already seen array
                On next passes, skip from self (arr); */
            const skip = arr.length >= 1 
                ? arr 
                : seen;

            /* Try adding a new random item */
            const rand = this._getRandomId(items);
            if (!skip.some(item => item.id === items[rand].id)) {
                arr.push(items[rand]);
            }
        }
        return arr;
    },

    _shuffle(a) {
        return a.sort(() => 0.5 - Math.random());
    },

    _getRandomId(items) {
        return Math.floor(Math.random() * items.length);
    },

    /* Remove unused data from the object
    */
    _stripObj(data) {
        return {
            answers: data.answers.map(x => ({name: x.name})),
            question: (({ id, img }) => ({ id, img }))(data.question)
        }
    }

}