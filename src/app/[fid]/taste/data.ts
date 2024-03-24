import { appConfig } from "../../appConfig"

type TasteData = {
    imageUrls: string[]
}

export async function getData(fname: string) {
    const dummyData: TasteData = {
        imageUrls: [
            'https://i.seadn.io/s/raw/files/21896b30f4747de609cb2e905780896f.jpg?auto=format&dpr=1&w=1000',
            'https://raw.seadn.io/files/e75adc828df624e0d745f1df4ee8542c.svg',
            'https://i.seadn.io/s/raw/files/d0bef94c8ece8b107648cec93b342e22.gif?auto=format&dpr=1&w=1000'
        ],
    }
    return dummyData
}

// FIXME: Testing out 1155 Tracker Base subgraph for latest transfers

// console.log('0xea990ae72939B8751cB680919C6B64A05B8e1451'.toLowerCase())

const graphQuery = (receiverAddress: string) => `
{
    transfers(
      where: {receiverAddress: "${receiverAddress}"}
      orderBy: timestamp
      orderDirection: desc
    ) {
      token {
        identifier
        collection {
          id
          name
          symbol
        }
      }
      receiverAddress {
        id
      }
      timestamp
    }
  }

`

type BASE1155TransfersReturnData = {
    transfers?: {
        collectionHoldings: {
            receiverAddress: {
                id: string
            },
            timestamp: string,
            token: {
                collection: {
                    id: string      // tokenAddy
                    name: string
                    symbol: string
                }
                identifier: string  // tokenId
            }
        }[];
    };
};

async function getLatestTransfers(eoa: string) {
    const query = graphQuery(eoa);
    const res = await fetch(appConfig.theGraph.base1155subgraph, requestInitPostJson(query));
    const { data }: { data: BASE1155TransfersReturnData} = await res.json();
    console.log(`1155data: ${JSON.stringify(data, null, 2)}`);
    return data.transfers
}

const requestInitPostJson = (query: string) => {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    };
};

// Test - works
// const dummyData = await getLatestTransfers('0xea990ae72939b8751cb680919c6b64a05b8e1451')