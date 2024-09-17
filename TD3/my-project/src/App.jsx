import ButtonCVA from './components/button'; 

function App() {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Intent Variants</h2>
        <ButtonCVA intent="primary" size="medium" rounde="rd">
          Primary - Rounded
        </ButtonCVA>
        <ButtonCVA intent="secondary" size="medium" rounde="rd">
          Secondary - Rounded
        </ButtonCVA>
        <ButtonCVA intent="alert" size="medium" rounde="rd">
          Alert - Rounded
        </ButtonCVA>
        <ButtonCVA intent="desactive" size="medium" rounde="rd">
          Desactive - Rounded
        </ButtonCVA>
        <ButtonCVA intent="outline" size="medium" rounde="rd">
          Outline - Rounded
        </ButtonCVA>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Size Variants</h2>
        <ButtonCVA intent="primary" size="small" rounde="rd">
          Small - Rounded
        </ButtonCVA>
        <ButtonCVA intent="primary" size="medium" rounde="rd">
          Medium - Rounded
        </ButtonCVA>
        <ButtonCVA intent="primary" size="large" rounde="rd">
          Large - Rounded
        </ButtonCVA>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Rounded Variants</h2>
        <ButtonCVA intent="primary" size="medium" rounde="rd">
          Fully Rounded
        </ButtonCVA>
        <ButtonCVA intent="primary" size="medium" rounde="md">
          Medium Rounded
        </ButtonCVA>
        <ButtonCVA intent="primary" size="medium" rounde="nrd">
          Slightly Rounded
        </ButtonCVA>
      </div>
    </div>
  );
}

export default App;
