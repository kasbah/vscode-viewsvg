import React from "react"
import { render } from "react-dom"
import { ReactSVGPanZoom, TOOL_PAN } from "react-svg-pan-zoom"
import { ReactSvgPanZoomLoader } from "./ReactSvgPanZoomLoader"

import "./App.css"
import svg from "./svgs/top.svg"

class App extends React.Component {
  state = {
    value: {},
    tool: TOOL_PAN,
    svg: "",
  }
  componentDidMount() {
    // Handle messages sent from the extension to the webview
    window.addEventListener("message", event => {
      const message = event.data // The json data that the extension sent
      switch (message.command) {
        case "svg":
          this.setState({ svg: message.value })
          break
      }
    })
  }
  render() {
    return (
      <>
        <ReactSvgPanZoomLoader
          svgXML={this.state.svg}
          render={content => {
            return (
              <ReactSVGPanZoom
                width="100%"
                height="100vh"
                tool={this.state.tool}
                onChangeTool={tool => this.setState({ tool })}
                value={this.state.value}
                onChangeValue={value => this.setState({ value })}
                customToolBar={<div />}
                background="#373737"
                SVGBackground="#373737"
              >
                <svg width={1536} height={692}>
                  {content}
                </svg>
              </ReactSVGPanZoom>
            )
          }}
        />
      </>
    )
  }
}
export default App
