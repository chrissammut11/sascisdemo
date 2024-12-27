        function extractValues(table, tagName, inputType, suffix) {
            const values = [];

            const inp = table.getElementsByTagName(tagName);

            if (inputType === 'text' || inputType === 'date') {
                const filteredInputs = Array.from(inp).filter(input => input.type === inputType);
                for (let input of filteredInputs) {
                    values.push(input.value);
                }
            } else if (inputType === 'select') {
                for (let select of inp) {
                    values.push(select.value);
                }
            }

            return values;
        }

        const table = document.getElementById('testTable');
        const noteValues = extractValues(table, 'input', 'input', 'text');
        const selectedValues = extractValues(table, 'select', 'select', 'select');
        const dateValues = extractValues(table, 'input', 'input', 'date');

        console.log('noteValues:', noteValues); // Output: ['Text1', 'Text2']
        console.log('selectedValues:', selectedValues); // Output: ['Option1', 'Option3']
        console.log('dateValues:', dateValues); // Output: ['2023-10-01', '2023-10-02']
