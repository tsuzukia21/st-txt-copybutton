import streamlit as st
from st_txt_copybutton import txt_copy

st.header("Example of Text Clipboard")
st.write("Enter text in the text area below and click the button to copy it to the clipboard.")

# Text area for text input
text_to_copy = st.text_area("Text to copy", "Enter text here", height=100)

# Copy button
copy_result = txt_copy(label="Copy to clipboard", text_to_copy=text_to_copy, key="text_clipboard")

if copy_result:
    st.success(f"{copy_result}")
else:
    st.info("Click the button to copy the text.")
    
a = st.button("Click me")