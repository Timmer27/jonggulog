import React, { useState, useCallback } from "react";

// >>>
import type {
  JsonGroup,
  Config,
  ImmutableTree,
  BuilderProps,
  JsonTree
} from "@react-awesome-query-builder/antd"; // for TS example
import {
  Query,
  Builder,
  Utils as QbUtils
} from "@react-awesome-query-builder/antd";
import { AntdConfig, AntdWidgets } from "@react-awesome-query-builder/antd";
//import "antd/dist/antd.css"; // only for v4
import "@react-awesome-query-builder/antd/css/styles.css";
import { Button } from "@material-tailwind/react";
const InitialConfig = AntdConfig;
// <<<

// You need to provide your own config. See below 'Config format'
const config: Config = {
  ...InitialConfig,
  operators: {
    // ...AntdConfig.operators,
    // Customize operators here
    equal: {
      ...AntdConfig.operators.equal,
      label: "="
    },
    greater: {
      ...AntdConfig.operators.greater,
      label: "클 때"
    },
    less: {
      ...AntdConfig.operators.less,
      label: "작을 때"
    },
    between: {
      ...AntdConfig.operators.between,
      label: "구간 내"
    }
  },
  settings: {
    ...AntdConfig.settings
    // groupActionsPosition: 'bottomLeft'
  },
  fields: {
    RSI: {
      type: "!group",
      label: "RSI",
      mode: "some",
      // conjunctions: ['AND'],
      subfields: {
        value: {
          type: "number",
          label: "값",
          valueSources: ["value"],
          operators: ["equal", "greater", "less"],
          fieldSettings: {
            min: 1
          }
        },
        span: {
          type: "number",
          label: "기간",
          valueSources: ["value"],
          operators: ["equal"],
          fieldSettings: {
            min: 1
          },
          defaultValue: 14
        }
      }
    },
    SMA: {
      type: "!group",
      label: "SMA(이동평균선)",
      mode: "some",
      // conjunctions: ['AND'],
      subfields: {
        value: {
          type: "number",
          label: "값",
          valueSources: ["value"],
          operators: ["equal", "greater", "less"],
          fieldSettings: {
            min: 1
          }
        },
        span: {
          type: "number",
          label: "기간",
          valueSources: ["value"],
          operators: ["equal"],
          fieldSettings: {
            min: 1
          },
          defaultValue: 20
        }
      }
    },
    EMA: {
      type: "!group",
      label: "EMA(지수이동평균선)",
      mode: "some",
      // conjunctions: ['AND'],
      subfields: {
        value: {
          type: "number",
          label: "값",
          valueSources: ["value"],
          operators: ["equal", "greater", "less"],
          fieldSettings: {
            min: 1
          }
        },
        span: {
          type: "number",
          label: "기간",
          valueSources: ["value"],
          operators: ["equal"],
          fieldSettings: {
            min: 1
          },
          defaultValue: 20
        }
      }
    },
    stochastic: {
      type: "!group",
      label: "스토캐스틱",
      mode: "some",
      // conjunctions: ['AND'],
      subfields: {
        fastk: {
          type: "number",
          label: "fastk",
          valueSources: ["value"],
          operators: ["equal", "greater", "less"],
          fieldSettings: {
            min: 1
          }
        },
        fastd: {
          type: "number",
          label: "fastd",
          valueSources: ["value"],
          operators: ["equal", "greater", "less"],
          fieldSettings: {
            min: 1
          }
        },
        fastk_period: {
          type: "number",
          label: "fastk_period",
          valueSources: ["value"],
          operators: ["equal"],
          fieldSettings: {
            min: 1
          },
          defaultValue: 5
        },
        fastd_period: {
          type: "number",
          label: "fastd_period",
          valueSources: ["value"],
          operators: ["equal"],
          fieldSettings: {
            min: 1
          },
          defaultValue: 3
        }
      }
    },
    // name: {
    //   label: "Name",
    //   type: "text"
    // },
    color: {
      label: "Color",
      type: "select",
      valueSources: ["value"],
      fieldSettings: {
        listValues: [
          { value: "yellow", title: "Yellow" },
          { value: "green", title: "Green" },
          { value: "orange", title: "Orange" }
        ]
      }
    },
    is_promotion: {
      label: "Promo?",
      type: "boolean",
      operators: ["equal"],
      valueSources: ["value"]
    }
  }
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue: JsonGroup = { id: QbUtils.uuid(), type: "group" };

const DemoQueryBuilder: React.FC = () => {
  const [state, setState] = useState({
    // tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    tree: undefined,
    config: config
  });
  const [jsonObj, setJsonObj] = useState<JsonTree>();

  const onChange = useCallback(
    (immutableTree: ImmutableTree, config: Config) => {
      // Tip: for better performance you can apply `throttle` - see `examples/demo`
      setState((prevState) => ({
        ...prevState,
        tree: immutableTree,
        config: config
      }));

      const jsonTree = QbUtils.getTree(immutableTree);
      setJsonObj(jsonTree);
    },
    []
  );

  const renderBuilder = useCallback(
    (props: BuilderProps) => (
      <div className="query-builder-container" style={{ padding: "10px" }}>
        <div className="query-builder qb-lite">
          <Builder {...props} />
        </div>
      </div>
    ),
    []
  );

  //   const jsonTreeValueConvertHandler = () => {
  //     if (jsonObj?.children1.length === 0) {
  //       alert("입력바람");
  //     } else {
  //       const jsonValue = jsonObj.children1.reduce((acc, cur) => {
  //           acc.push(cur.children1);
  //         // if (cur.children1) {
  //         //   cur.children1.forEach((ele) => {
  //         //   });
  //         // }
  //         return acc;
  //       }, []);
  //     //   const jsonValue = jsonObj.children1.reduce((acc, cur) => {
  //     //     if (cur.children1) {
  //     //       cur.children1.forEach((ele) => {
  //     //         acc.push(ele.properties);
  //     //       });
  //     //     }
  //     //     return acc;
  //     //   }, []);
  //       console.log('jsonValue', jsonValue)
  //     }
  //   };

  return (
    <div>
      <Query
        {...config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      {/* <div className="query-builder-result">
        <div>
          Query string:{" "}
          <pre>
            {JSON.stringify(QbUtils.queryString(state.tree, state.config))}
          </pre>
        </div>
        <div>
          MongoDb query:{" "}
          <pre>
            {JSON.stringify(QbUtils.mongodbFormat(state.tree, state.config))}
          </pre>
        </div>
        <div>
          SQL where:{" "}
          <pre>
            {JSON.stringify(QbUtils.sqlFormat(state.tree, state.config))}
          </pre>
        </div>
        <div>
          JsonLogic:{" "}
          <pre>
            {JSON.stringify(QbUtils.jsonLogicFormat(state.tree, state.config))}
          </pre>
        </div>
      </div> */}
    </div>
  );
};
export default DemoQueryBuilder;
