async function fetchData() {
    return [
        { filename: 'file1.txt', content: '@tags: { "tag1": true, "tag2": false }, @name: "John" ' },
        { filename: 'file2.txt', content: '@tags: { "tag1": false, "tag2": true }, @name: "Alice" ' },
        // Add more files as needed
    ];
}
