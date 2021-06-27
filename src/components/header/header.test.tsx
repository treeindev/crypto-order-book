import * as reactRedux from 'react-redux';
import { render } from '@testing-library/react';
import Header from './index';

import { TEST_USER_CURRENCY, TEST_GROUP } from "../../tests/mocks";

describe("Component testing", () => {
    const selector = jest.spyOn(reactRedux, 'useSelector');
    const dispatcher = jest.spyOn(reactRedux, 'useDispatch');
    
    it("Should render the header correctly", () => {
        // Mock Redux's selector and dispatcher
        const dispatchTestFunction = jest.fn();
        dispatcher.mockReturnValue(dispatchTestFunction);
        selector.mockReturnValue({
            currency: TEST_USER_CURRENCY, 
            group: TEST_GROUP[0]
        });
        const { getByTestId } = render(<Header />);

        // Assert for correct rendering of test values
        expect(getByTestId("header_currency_name").textContent)
            .toEqual(TEST_USER_CURRENCY.name);
        expect(getByTestId("header_currency_group").textContent)
            .toEqual(TEST_GROUP[0].toString());
    })
})