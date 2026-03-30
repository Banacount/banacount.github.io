export const loadTemp = async (templateName, valueCall) => {
    try {
        let getTemp = await fetch(templateName);
        if (!getTemp.ok) getTemp = await fetch(`./pages/${templateName}`);
        if (!getTemp.ok) throw new Error(`cannot get ${templateName} content.`);

        const getContent = await getTemp.text();
        valueCall(getContent);
    } catch (error) {
      console.error("An error happened: " + error);
      valueCall(1);
      return 1;
    }
}
