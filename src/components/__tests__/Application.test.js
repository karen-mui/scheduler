import React from 'react';
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, getByText, getByAltText, getByPlaceholderText, getAllByTestId, queryByText, prettyDOM, getByTestId } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));

      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];


    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();


    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday"));

    expect(getByText(day, /no spots remaining/i));

  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // all the appointments come back in an array, use the find method to then find the first element that matches query!!
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // click delete button
    fireEvent.click(getByAltText(appointment, "Delete"));
    // click confirm
    fireEvent.click(queryByText(appointment, "Confirm"));
    // check to see if "DELETING"
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();
    // check to see if there are 2 spots remaining

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday"));

    expect(getByText(day, /2 spots remaining/i));
   
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    const { container, debug } = render(<Application/>);

    await waitForElement(() => getByText(container, "Archie Cohen"));


    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen"));

      fireEvent.click(getByAltText(appointment, "Edit"));

      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      
      fireEvent.click(getByText(appointment, "Save"));
  
      expect(getByText(appointment, "SAVING")).toBeInTheDocument();
  
      await waitForElement(() => getByText(container, "Archie Cohen"))
  
      expect(getByText(container, "Sylvia Palmer")).toBeInTheDocument();
  
      const day = getAllByTestId(container, "day").find(day => 
        queryByText(day, "Monday")
      );
      expect(getByText(day, /1 spot remaining/i));

  });


  it("shows the save error when failing to save an appointment", async () => {

    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];


    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    await waitForElement(() => getByText(appointment, "Error"))

    expect(queryByText(appointment, /Could not save appointment/i)).toBeInTheDocument();

  });


  it("shows the delete error when failing to delete an existing appointment", async () => {

    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));
    fireEvent.click(queryByText(appointment, "Confirm"));

    
    await waitForElement(() => getByText(appointment, "Error"));
    
    expect(queryByText(appointment, /Could not cancel appointment/i)).toBeInTheDocument();


  });

});
