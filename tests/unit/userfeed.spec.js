import { shallowMount } from "@vue/test-utils";
import UserFeed from "../../src/components/userviews/UserFeed";
import UserRecord from "../../src/components/userviews/UserRecord";

describe("UserFeed.vue", () => {
  const mountCmp = () => {
    const wrapper = shallowMount(UserFeed);
    return {
      wrapper,
      recordWrapper: () => wrapper.findAllComponents(UserRecord),
    };
  };

  it("simple testing", () => {
    const { wrapper } = mountCmp();
    expect(wrapper.contains("v-container")).toBe(true);
  });

  it("render child components", () => {
    const { recordWrapper } = mountCmp();
    expect(recordWrapper().length).toBe(5);
  });

  it("children recieve props", () => {
    const { recordWrapper } = mountCmp();
    const propsLength = recordWrapper().wrappers.filter(
      (wrap) => wrap.props().record
    ).length;
    expect(propsLength).toBe(recordWrapper().length);
  });

  it("child recieve correct props", () => {
    const { wrapper, recordWrapper } = mountCmp();
    wrapper.setData({
      records: [
        {
          date: "01/02/2020",
          text: "Finished Konan the Barbarian",
          link: "/book/12345",
        },
        1,
        2,
        3,
        4,
      ],
    });
    const child = recordWrapper().wrappers[0];

    expect(child.vm.record).toStrictEqual(wrapper.vm.records[0]);
  });
});
