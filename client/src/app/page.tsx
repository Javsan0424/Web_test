
export default function Home() {
  return (
    <div>
      <main>
        <div className="flex grid-cols-3 gap-4 justify-center mt-4">

          <input type="text" className="shadow shadow-black"/>

          <select name="selectedFruit" className="shadow shadow-black">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>

          <input type="text" className="shadow shadow-black" />
        </div>

        <div className="flex justify-center mt-5">
          <button className=" flex justify-center shadow shadow-black h-6 w-24">Calculate</button>
        </div>

      </main>

    </div>
  );
}
