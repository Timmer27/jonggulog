import React, { useState, useCallback } from "react";

// >>>
import type {
  JsonGroup,
  Config,
  ImmutableTree,
  BuilderProps
} from "@react-awesome-query-builder/antd"; // for TS example
import {
  Query,
  Builder,
  Utils as QbUtils
} from "@react-awesome-query-builder/antd";
import { AntdConfig, AntdWidgets } from "@react-awesome-query-builder/antd";
//import "antd/dist/antd.css"; // only for v4
import "@react-awesome-query-builder/antd/css/styles.css";
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
      label: "동일 (=)"
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
  fields: {
    RSI: {
      label: "RSI",
      type: "number",
      widgets: {
        time: {
          operators: ["equal", "between"],
          widgetProps: {
            valuePlaceholder: "Time",
            timeFormat: "h:mm:ss A",
            use12Hours: true
          }
          // opProps: {
          //     between: {
          //         valueLabels: ['Time from', 'Time to'],
          //     },
          // },
        }
      },
      fieldSettings: {
        min: 0,
        max: 100
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    SMA: {
      label: "SMA(이동평균선)",
      type: "number",
      valueSources: ["value"],
      fieldSettings: {
        min: 1
      },
      preferWidgets: ["slider", "rangeslider"]
    },
    EMA: {
      label: "EMA(지수이동평균선)",
      type: "number",
      valueSources: ["value"],
      fieldSettings: {
        min: 1
      }
      //   preferWidgets: ["slider", "rangeslider"]
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
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config
  });

  const onChange = useCallback(
    (immutableTree: ImmutableTree, config: Config) => {
      // Tip: for better performance you can apply `throttle` - see `examples/demo`
      setState((prevState) => ({
        ...prevState,
        tree: immutableTree,
        config: config
      }));

      const jsonTree = QbUtils.getTree(immutableTree);
      console.log(jsonTree);
      // `jsonTree` can be saved to backend, and later loaded to `queryValue`
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

  return (
    <div>
      <Query
        {...config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      <div className="query-builder-result">
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
      </div>
    </div>
  );
};
export default DemoQueryBuilder;
