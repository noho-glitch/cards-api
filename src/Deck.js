import React, { Component } from 'react'
import axios from 'axios';

const API_URL = "https://deckofcardsapi.com/api/deck"


class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = { deck: null }
        this.getCard = this.getCard.bind(this);
    }
    async componentDidMount() {
        let deck = await axios.get(`${API_URL}/new/shuffle/`)
        console.log(deck)
        this.setState({deck: deck.data})
    }
    async getCard() {
        let id = this.state.deck.deck_id;
        let CARD_URL = `${API_URL}/${id}/draw/`
        
        //make request to api for new card
        let draw = await axios.get(CARD_URL);
        console.log(draw)
    }
    render() {
        return (
            <div>
                <h1>Shuffled Deck of Cards</h1>
                <button onClick={this.getCard}>Draw Card!</button>
            </div>
        )
    }
}

export default Deck;
