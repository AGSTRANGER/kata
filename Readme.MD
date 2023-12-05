# Number-to-French-Converter

This project provides a simple utility to convert numerical input to their French word equivalents. The primary purpose is to convert a list of numbers and store the results in a JSON file.

## Usage

1. Ensure you have Node.js installed on your machine.

2. Clone this repository:

   ```bash
   git clone https://github.com/your-username/Number-to-French-Converter.git
   ```

3. **Navigate to the project directory:**

   ```bash
   cd Number-to-French-Converter
   ```

4. **Run the conversion script:**

   ```bash
   node main.js
   ```

   This will use the default set of numbers provided in `dataSet.js` and generate a `result.json` file containing the converted values.

## Code Structure

The project follows separation of concerns and modularity to enhance maintainability and readability.

### `main.js`

This file serves as the entry point to the application. It imports the dataset and conversion service to initiate the conversion process.

### `services.js`

The `services.js` file contains the core functionality for converting numbers to French. It leverages helper functions from `helpers.js` for a more modular approach.

### `helpers.js`

This file provides helper functions that perform specific conversion tasks, such as converting units, teens, tens, and handling different ranges of numbers.

## Respect for Coding Best Practices

The project adheres to coding best practices, including:

- **Separation of Concerns:** The code is organized into distinct files (`main.js`, `services.js`, `helpers.js`) to separate different functionalities and improve code maintainability.

- **Modularity:** Functions are designed to be modular, with each responsible for a specific conversion task. This enhances code readability and makes it easier to extend or modify the functionality.

- **Error Handling:** The `convertToFrench` function includes error handling to address cases where the input number is out of the valid range.

## Note

Please note that the dataset and conversion logic can be easily customized to suit specific requirements. Feel free to modify the `inputNumbers` in `dataSet.js` or use the conversion functions individually as needed.
