import * as reactRedux from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import Footer from './index';

import { TEST_USER_CURRENCY } from "../../tests/mocks";
import { AVAILABLE_CURRENCIES } from "../../utils/constants";

describe("Component testing", () => {
    // Mock Redux's selector
    const selector = jest.spyOn(reactRedux, 'useSelector');
    const dispatcher = jest.spyOn(reactRedux, 'useDispatch');
    const mockedState = {
      userCurrency: TEST_USER_CURRENCY,
      exchangeRatio: "12345"
    }

    beforeEach(() => {
        // Mocks have to be cleared before each execution.
        selector.mockClear();
        dispatcher.mockClear();
    })
    
    it("Should render the footer correctly", () => {
        selector.mockReturnValue(mockedState);
        const { getByTestId } = render(<Footer />);

        expect(getByTestId("footer_currency_name").textContent)
            .toEqual(TEST_USER_CURRENCY.name);
        expect(getByTestId("footer_currency_id").textContent)
            .toEqual(TEST_USER_CURRENCY.id);
    });

    it("Should render the crypto collection", () => {
        selector.mockReturnValue(mockedState);
        const { getByTestId } = render(<Footer />);

        expect(getByTestId("footer_crypto_gallery").children.length)
            .toEqual(AVAILABLE_CURRENCIES.length)
    });

    it("Should dispatch action for changing the crypto selection when user clicks", () => {
        const dispatchTestFunction = jest.fn();
        selector.mockReturnValue(mockedState);
        dispatcher.mockReturnValue(dispatchTestFunction);
        const { getByTestId } = render(<Footer />);

        // Ensure the dispatcher hasn't been called upon component rendering
        expect(dispatchTestFunction).not.toHaveBeenCalled()

        // Manually click on element.
        const firstCurrency = getByTestId("footer_crypto_gallery").children[1];
        fireEvent.click(firstCurrency);
        expect(dispatchTestFunction).toHaveBeenCalled();

        // After the currency click, there should be an update on the DOM values.
        expect(getByTestId("footer_currency_name").textContent)
            .toEqual(AVAILABLE_CURRENCIES[1].name);
        expect(getByTestId("footer_currency_id").textContent)
            .toEqual(AVAILABLE_CURRENCIES[1].id);
    });

    it("Should show the exchange ratio for current currency state", () => {
        selector.mockReturnValue(mockedState);
        const { getByTestId } = render(<Footer />);

        expect(getByTestId("footer_exchange_ratio").textContent)
            .toEqual(mockedState.exchangeRatio)
    });
})