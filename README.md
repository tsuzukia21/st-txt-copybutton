# streamlit-custom-component

Streamlit component that allows you to create button to copy text.

This is useful in situations where you can't use pyperclip.

## Installation instructions

```sh
pip install st_txt_copybutton
```

or

```sh
pip install st_txt_copybutton --upgrade
```


## Usage instructions

```python
import streamlit as st
from st_txt_copybutton import txt_copy

st.header("Example of Text Clipboard")
st.write("Enter text in the text area below and click the button to copy it to the clipboard.")

# Text area for text input
text_to_copy = st.text_area("Text to copy", "Enter text here", height=100)

# Copy button
if txt_copy(label="Copy to clipboard", text_to_copy=text_to_copy, key="text_clipboard"):
    st.toast("Text copied to clipboard!")
```

run
```python
streamlt run examle.py
```
