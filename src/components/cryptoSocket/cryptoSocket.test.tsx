import * as React from 'react'
import * as reactRedux from 'react-redux';
import { render } from '@testing-library/react';
import CryptoSocket from './index';

import { TEST_USER_CURRENCY } from "../../tests/mocks";

describe("Web Socket testing", () => {
    // Mock Redux's selector.
    const selector = jest.spyOn(reactRedux, 'useSelector');
    const dispatcher = jest.spyOn(reactRedux, 'useDispatch');

    beforeEach(() => {
        // Mocks have to be cleared before each execution.
        selector.mockClear();
        dispatcher.mockClear();
    })
    
    it("Should start crypto socket correctly", () => {
        const useStateSpy = jest.spyOn(React, 'useState');
        const dispatchTestFunction = jest.fn();
        selector.mockReturnValue(TEST_USER_CURRENCY);
        dispatcher.mockReturnValue(dispatchTestFunction);
        
        render(<CryptoSocket />);
        
        // Upon Component rendering, the dispatching of messages shouldn't have been called.
        expect(dispatchTestFunction).not.toHaveBeenCalled();
        
        // There is a single instance of useState: socket internal currency
        expect(useStateSpy).toHaveBeenCalledTimes(1);
    });
});