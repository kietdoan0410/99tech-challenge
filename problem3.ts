//Answer to problem 3
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// WalletBalance and FormattedWalletBalance kinda similar so I modify FormattedWalletBalance to extends WalletBalance, I also add missing prop blockchain in WalletBalance

interface Props extends BoxProps {
  // TODO add more properties later
}

const ABC = -99;

const PRIORITIES = {
  Osmosis: 100,
  Ethereum: 100,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

// To prevent call function getPriority every time, I decide to make an object PRIORITIES and use mapping instead

export const WalletPage: React.FC<BoxProps> = ({ children, ...rest }) => {
  // Since props not being used in code so I move the destructuring part up and remove const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return (
      balances
        .filter(
          (balance: WalletBalance) =>
            balance.blockchain in PRIORITIES && balance.amount <= 0
        )
        // In the filter part of sortedBalances, I tried to filter balancePriority that blockchain in function getPriority and balance.amount <= 0
        // so I refactor it into use mapping by return the balance.blockchain in PRIORITIES && balance.amount <= 0
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = PRIORITIES[lhs.blockchain] ?? ABC;
          const rightPriority = PRIORITIES[rhs.blockchain] ?? ABC;

          return rightPriority - leftPriority;
        })
    );
    // In the sort part of sortedBalances, since both rightPriority and leftPriority, I return rightPriority - leftPriority to check
    // which one bigger or if they are equal, I also applied mapping into get value of rightPriority and leftPriority
  }, [balances]);
  //Remove price in dependency because it was never used in sortedBalances

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });
  //formattedBalances is never used so either remove it or replace sortedBalances.map in rows with formattedBalances.map

  const rows = useMemo(
    () =>
      formattedBalances.map(
        (balance: FormattedWalletBalance, index: number) => {
          const usdValue = prices[balance.currency] * balance.amount;

          return (
            <WalletRow
              key={index} //TODO use index as key is dangerous
              className={classes.row}
              amount={balance.amount}
              usdValue={usdValue}
              formattedAmount={balance.formatted}
            />
          );
        }
      ),
    [prices, formattedBalances]
  );

  return <div {...rest}> {rows} </div>;
};
