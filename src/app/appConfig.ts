const THE_GRAPH = "https://gateway-arbitrum.network.thegraph.com/api/";

export const appConfig = {
    host: process.env.HOST!,
    theGraph: {
        eth721subgraph:
            THE_GRAPH +
            process.env["GRAPH_API_KEY"]! +
            "/subgraphs/id/CBf1FtUKFnipwKVm36mHyeMtkuhjmh4KHzY3uWNNq5ow",
        eth1155subgraph:
            THE_GRAPH +
            process.env["GRAPH_API_KEY"]! +
            "/subgraphs/id/5C6JRVzKcE9AVbT7S71EycV8eEGcfkJB9gGsyTbHMVmN",
        base721subgraph:
            THE_GRAPH +
            process.env["GRAPH_API_KEY"]! +
            "/subgraphs/id/D4ab55j22wJLqdkmepiMVcSxQ44S2DTdh5aRQ5f5EqJF",
        base1155subgraph:
            THE_GRAPH +
            process.env["GRAPH_API_KEY"]! +
            "/subgraphs/id/9LyYqhj7LqDaivsifyeYF7ERqtmisnzXWm2799qo7Xfq",
    },
}