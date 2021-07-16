import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });
import {
  sum,
  continents,
  capitalizeFirstLetter,
} from "./src/utils/Filters-utils";

test("continents", () => {
  expect(continents.length).toBe(5);
});

test("adds 1 + 2 to equal 3", () => {
  expect(capitalizeFirstLetter("run")).toBe("Run");
});
