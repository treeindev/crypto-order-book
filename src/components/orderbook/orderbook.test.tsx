import * as reactRedux from 'react-redux';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import OrderBook from './index';

import { 
    TEST_PRICE_ORDER, 
    TEST_HIGHEST_ORDER, 
    TEST_LOWEST_ORDER, 
    TEST_TOTAL_ORDER_BOOK
} from "../../tests/mocks";

configure({ adapter: new Adapter() });
describe("Component testing", () => {
    const selector = jest.spyOn(reactRedux, 'useSelector')
    const displayLimit = 20;

    beforeEach(() => {
        // Mocks have to be cleared before each execution.
        selector.mockClear();
        selector.mockReturnValue({ 
            bids: TEST_PRICE_ORDER, 
            asks: TEST_PRICE_ORDER
        });
    })
    
    it("Should render the header correctly", () => {
        const { getByTestId } = render(<OrderBook />);
        expect(getByTestId("orderbook_bids")).toBeInTheDocument();
        expect(getByTestId("orderbook_asks")).toBeInTheDocument();
    });

    it("Should should limit the order display according to limit ratios", () => {
        const { getByTestId } = render(<OrderBook />);
        expect(getByTestId("orderbook_bids").children.length).toEqual(displayLimit);
        expect(getByTestId("orderbook_asks").children.length).toEqual(displayLimit);
    });

    it("Should display the Book list in correct order", () => {
        const { getByTestId } = render(<OrderBook />);

        // Validate the BIDS are listed from Highest to Lowest
        expect(getByTestId("orderbook_bids").children[0].textContent)
            .toEqual(`${TEST_HIGHEST_ORDER.size}${TEST_HIGHEST_ORDER.size}${TEST_HIGHEST_ORDER.price}`);
            expect(getByTestId("orderbook_bids").children[displayLimit-1].textContent)
            .toEqual(`${TEST_TOTAL_ORDER_BOOK}${TEST_LOWEST_ORDER.size}${TEST_LOWEST_ORDER.price}`);

        // Validate the ASKS are listed from Lowest to Highest
        expect(getByTestId("orderbook_asks").children[0].textContent)
            .toEqual(`${TEST_LOWEST_ORDER.size}${TEST_LOWEST_ORDER.price}${TEST_TOTAL_ORDER_BOOK}`);
            expect(getByTestId("orderbook_asks").children[displayLimit-1].textContent)
            .toEqual(`${TEST_HIGHEST_ORDER.price}${TEST_HIGHEST_ORDER.size}${TEST_HIGHEST_ORDER.size}`);
    });
})