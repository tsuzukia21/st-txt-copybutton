import React from "react";
import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
  Theme,
} from "streamlit-component-lib";

interface State {
  textData: string | null;
  error: string | null;
}

class TextClipboardComponent extends StreamlitComponentBase<State> {
  public state: State = { textData: null, error: null };

  private handleButtonClick = async (): Promise<void> => {
    try {
      const textToCopy = String(this.props.args["text_to_copy"]);
      await navigator.clipboard.writeText(textToCopy);
      this.setState({ textData: textToCopy, error: null }, () => {
        Streamlit.setComponentValue("Copied: " + textToCopy);
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        console.log("Access to the clipboard was denied.");
      } else if (err instanceof Error) {
        this.setState({ error: "Failed to copy text. Details: " + err.message });
        console.error("Failed to copy to clipboard: ", err.message);
      } else {
        this.setState({ error: "Failed to copy text." });
        console.error("Failed to copy to clipboard");
      }
    }
  };

  public render = (): React.ReactNode => {
    const label = String(this.props.args["label"])
    const { error } = this.state;
    const theme: Theme | undefined = this.props.theme;

    const buttonStyle = {
      backgroundColor: "transparent",
      color: theme.textColor,
      padding: "5px 10px",
      border: `1px solid ${theme.textColor}40`,
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      outline: "none",
      transition: "color 0.3s, border-color 0.3s",
      display: "inline-block",
      height: "40px",
      lineHeight: "27px",
    };

    const buttonHoverStyle = {
      color: theme.primaryColor,
      borderColor: theme.primaryColor,
    };

    return (
      <div>
        <button
          onClick={this.handleButtonClick}
          style={buttonStyle}
          onMouseEnter={e => {
            Object.assign(e.currentTarget.style, buttonHoverStyle);
          }}
          onMouseLeave={e => {
            Object.assign(e.currentTarget.style, buttonStyle);
          }}
        >
          <label>{label}</label>
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    );
  };
}

export default withStreamlitConnection(TextClipboardComponent);
