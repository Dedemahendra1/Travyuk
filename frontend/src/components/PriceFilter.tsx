type Props = {
    selectedPrice?: number;
    onChange: (value?: number) => void;
  };
  
  const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  const arrayPrice = [50, 100, 200, 300, 500];

  return (
    <div>
      <h4 className="text-md font-semibold mb-2"> Max Price</h4>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {arrayPrice.map((price, index) => (
          <option key={index} value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
};

  
  export default PriceFilter