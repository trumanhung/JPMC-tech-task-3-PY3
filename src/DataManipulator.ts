import { ServerRespond } from './DataStreamer';

export interface Row {
  timestamp: Date,
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;

    const bound = 0.05;
    const upperBound = 1 + bound;
    const lowerBound = 1 - bound;

    // return serverResponds.map((el: any) => {
      return {
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
          serverResponds[0].timestamp : serverResponds[1].timestamp,
        price_abc: priceABC,
        price_def: priceDEF,
        ratio,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
      };
    // })
  }
}
