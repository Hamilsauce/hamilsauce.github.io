export const style = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    z-index: 1;
    list-style: none;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }
  
  #tree-list {
  width: 100%;
  // height: 100%;
    overflow-y: scroll;
  }
  .node {
    width: 100%;
  }
  .collapsible-button {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 20px;
    gap: 0px;
    justify-content: center;
    align-items: center;
    background-color: #0000004A;
    cursor: pointer;
    padding: 12px 12px 12px 12px;
    width: 100%;
    height: 100%;
    text-align: left;
    outline: none;
    color: #D1D1D1;
    border: 1px solid #4141419E;
    border-radius: 3px;
    // box-shadow: 0 0px 4px 1px #E6E6E61F;
    backdrop-filter: brightness(90%);
    overflow: hidden;
  }
  .collapsible-button-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 8px;
    font-size: 18px;
    overflow: hidden;
  }
  .button-name{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size:18px;
    max-width: 90%;
  }
  .button-size{
    font-size:13px;
    filter: opacity(0.8);
  }   
  
  .node[data-active=false]>.collapsible-button {
    text-overflow: ellipsis;
    filter: contrast(130%);
  }
   .node[data-active=true]>.collapsible-button {
    filter: brightness(150%);
    backdrop-filter: brightness(40%);
    text-overflow: ellipsis;
  }
  .node[data-active=true]>.collapsible-button:after {
    font-size: 20px
    color: white;
    font-weight: bold;
    float: right;
    margin-left: 5px;
    content: "\\2212";
  }
  .node[data-active=false]>.collapsible-button:after {
    font-size: 20px;
    color: white;
    font-weight: bold;
    float: right;
    margin-left: 5px;
    content: "\\002B";
  }
  .node[data-active=true][data-has-children=false]>.collapsible-button:after {
    content: "";
  }
  .node[data-active=false][data-has-children=false]>.collapsible-button:after {
    content: "";
  }
  .collapsible-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  .collapsible-content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 10px;
    padding: 4px 0px 10px 10px;
    overflow: hidden;
    transition: padding 0.2s ease;
    border-left: 1px solid #EEEEEE30;
  }
  .node[data-active=false]>.collapsible-content-wrapper {
    padding: 4px 0 0 10px;
  }
`;
