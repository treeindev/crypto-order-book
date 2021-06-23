import * as reactRedux from 'react-redux';
import { render } from '@testing-library/react';
import OrderBook from './index';

import { TEST_BIDS, TEST_ASKS } from "../../tests/mocks";

describe("Component testing", () => {
    const selector = jest.spyOn(reactRedux, 'useSelector')
    const displayLimit = 20;
    
    it("Should render the header correctly", () => {
        // Mock Redux's selector
        selector.mockReturnValue({ 
            bids: TEST_BIDS, 
            asks: TEST_ASKS
        });
        const { getByTestId } = render(<OrderBook />);

        // Assert for correct rendering of test values
        expect(getByTestId("orderbook_bids").children.length).toBe(true);
    })
})