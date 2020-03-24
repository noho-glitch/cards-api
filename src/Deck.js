import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const API_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: []
    };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    let deck = await axios.get(`${API_URL}/new/shuffle/`);
    console.log(deck);
    this.setState({ deck: deck.data });
  }
  async getCard() {
    let id = this.state.deck.deck_id;
    try {
      let CARD_URL = `${API_URL}/${id}/draw/`;

      //make request to api for new card
      let draw = await axios.get(CARD_URL);
      console.log(draw);
      if (!draw.data.success) {
        throw new Error("No Cards Remaining");
      }

      //Capture Card information
      let card = draw.data.cards[0];
      // console.log(`Card: ${JSON.stringify(card)}`);

      //Update State
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    } catch (Error) {
      alert(Error);
    }
  }
  render() {
    const cards = this.state.drawn.map(c => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));
    return (
      <div>
        <h1>Shuffled Deck of Cards</h1>
        <button onClick={this.getCard}>Draw Card!</button>
        <div className="Drawn-Cards">{cards}</div>
      </div>
    );
  }
}

export default Deck;
