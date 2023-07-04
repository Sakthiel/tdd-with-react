import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Game from "./Game";

describe("testing the rendering of square component", () => {
    it("should render status as next player is X initially", () => {
      const { getByText } = render(<Game />);
      const text = getByText('Next player to move : X');
      expect(text).toBeInTheDocument();
    });
  
    it("should render status as next player is O after X turn", () => {
      const { getByText, getAllByRole } = render(<Game />);
  
      fireEvent.click(getAllByRole("button")[0]);
  
      const text = getByText('Next player to move : O');
      expect(text).toBeInTheDocument();
    });
    it("should render X and O alternatively in buttons", () => {
        const { getAllByRole } = render(<Game />);
        const firstSquare = getAllByRole("button")[0];
    
        fireEvent.click(firstSquare);
        expect(firstSquare).toHaveTextContent("X");
    
        const secondSquare = getAllByRole("button")[1];
        fireEvent.click(secondSquare);
    
        expect(secondSquare).toHaveTextContent("O");
      });
      it("should render same symbol if buttons are clicked more than once", () => {
        const { getAllByRole } = render(<Game />);
        const firstSquare = getAllByRole("button")[0];
        const secondSquare = getAllByRole("button")[0];
        fireEvent.click(firstSquare);
        fireEvent.click(secondSquare);
        expect(firstSquare).toHaveTextContent("X");
     });

});

describe("testing functionality of game component after a win", () => {
    it("render Winner status when game ends", () => {
      const { getByText, getAllByRole } = render(<Game />);
  
      const numbers = [0, 4, 1, 7, 2];
      for (let i = 0; i < numbers.length; i++) {
        fireEvent.click(getAllByRole("button")[numbers[i]]);
      }
  
      const text = getByText('Winner is : X');
      expect(text).toBeInTheDocument();
    });
    it("render no symbol at empty spots after game ends", () => {
        const { getByText, getAllByRole } = render(<Game />);
    
        const numbers = [0, 4, 1, 7, 2];
        for (let i = 0; i < numbers.length; i++) {
          fireEvent.click(getAllByRole("button")[numbers[i]]);
        }
    
        const square = getAllByRole("button")[3];
        fireEvent.click(square);
        expect(square).toHaveTextContent("")
      });
      
    
  });
  describe("Testing time travel feature", () => {
    it("should render the go back button", () => {
      const { getByText } = render(<Game />);
      const reset = getByText("Go to start of game");
      expect(reset).toBeInTheDocument();
    });
  
    it("should return empty string after undo a move", () => {
      const { getByText, getAllByRole } = render(<Game />);
  
      fireEvent.click(getAllByRole("button")[0]); // X
      const reset = getByText("Go to start of game");
      fireEvent.click(reset);
  
      expect(getAllByRole("button")[0]).toHaveTextContent("");
    });
  
    it("should go back to previous particular state", () => {
      const { getByText, getAllByRole } = render(<Game />);
  
      fireEvent.click(getAllByRole("button")[0]); // X
      fireEvent.click(getAllByRole("button")[1]); // O
      fireEvent.click(getAllByRole("button")[2]); // X
  
      const moveOne = getByText("Go to move 1");
      fireEvent.click(moveOne);
  
      expect(getAllByRole("button")[0]).toHaveTextContent("X");
      expect(getAllByRole("button")[1]).toHaveTextContent("");
      expect(getAllByRole("button")[2]).toHaveTextContent("");
    });

    it("should return next player status at particular state", () => {
        const { getByText, getAllByRole } = render(<Game />);
    
        fireEvent.click(getAllByRole("button")[0]); // X
        fireEvent.click(getAllByRole("button")[1]); // O
        fireEvent.click(getAllByRole("button")[2]); // X
    
        const moveOne = getByText("Go to move 1");
        fireEvent.click(moveOne);
    
        const player = getByText("Next player to move : O");
        expect(player).toBeInTheDocument();
      });
  });
