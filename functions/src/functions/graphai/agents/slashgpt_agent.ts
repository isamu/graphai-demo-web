import { AgentFunction } from "graphai/lib/type";

export const slashGPTFuncitons2TextAgent: AgentFunction<
  { function_data_key: string },
  Record<string, string>,
  { function_data: { [key: string]: string[] } }
> = async (context) => {
  const { params } = context;
  const result = (context?.inputs[0].function_data[params.function_data_key] || []).map((r: any) => {
    const { title, description } = r;
    return ["title:", title, "description:", description].join("\n");
  });

  return { content: result[0] };
};

/*
const slashGPTAgentMock : AgentFunction<
  { function_data_key: string; result_key: number },
  Record<string, string>,
  { function_data: { [key: string]: string[] } }
> = async (context) => {
  return { content: "test response" };
};
*/
const slashGPTAgentMock = slashGPTFuncitons2TextAgent;

const apiDoc = {
  inputs_example: [
    {
      role: "function_result",
      content: "",
      name: "",
      preset: false,
      function_data: {
        methods: [
          {
            title: "Renewable Energy",
            description:
              "Promote the use of renewable energy sources like solar, wind, and hydro power to reduce dependence on fossil fuels and decrease CO2 emissions.",
          },
          {
            title: "Energy Efficiency",
            description: "Improve energy efficiency in industries, buildings, and transportation to reduce energy consumption and lower CO2 emissions.",
          },
        ],
      },
    },
  ],
  response_example: { content: "test response" },
};

export const slashGPTFuncitons2TextAgentInfo = {
  name: "slashGPTFuncitons2TextAgent",
  agent: slashGPTFuncitons2TextAgent,
  mock: slashGPTAgentMock,
  doc: apiDoc,
  // validateRule,
  description: "Format the result of slashgpt's function calling",
  author: "isamu arimoto",
  repository: "https://github.com/isamu/graphai/",
};
export default slashGPTFuncitons2TextAgentInfo;
