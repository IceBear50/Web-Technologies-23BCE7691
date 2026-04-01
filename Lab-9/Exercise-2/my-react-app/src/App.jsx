
import StudentProfile from './components/StudentProfile.jsx';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Student Directory</h1>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center' 
      }}>
        <StudentProfile 
          name="Ice Bear" 
          department="CSE" 
          marks="92" 
        />
        
        <StudentProfile 
          name="Nice Bear" 
          department="ECE" 
          marks="88" 
        />
        
        <StudentProfile 
          name="Thrice Bear" 
          department="IT" 
          marks="95" 
        />
      </div>
    </div>
  );
}

export default App;