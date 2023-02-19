import { formatCurrency } from "../../helpers";

export const CountTotalProject = ({ myTotalProject }) => {
  return (
    <p className="total__card--mytotal">
      <strong>Total:{formatCurrency(myTotalProject)}</strong>
    </p>
  );
};
