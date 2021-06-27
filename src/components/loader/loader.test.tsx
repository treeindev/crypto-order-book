import * as reactRedux from 'react-redux';
import { render } from '@testing-library/react';
import Loader from './index';

describe("Component testing", () => {
    const selector = jest.spyOn(reactRedux, 'useSelector');

    beforeEach(() => {
        selector.mockClear();
    });
    
    it("Should render the loader as inactive when app state is false", () => {
        selector.mockReturnValue(false);
        const { getByTestId } = render(<Loader />);
        expect(getByTestId("loader_container")).not.toHaveClass("active")
    });

    it("Should render the loader as active when app state is true", () => {
        selector.mockReturnValue(true);
        const { getByTestId } = render(<Loader />);
        expect(getByTestId("loader_container")).toHaveClass("active")
    });
});