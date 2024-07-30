import './SponsorKey.css';

export const SponsorKey = () => {
  return (
    <div className="sponsor-key">
      <h3>Chave para como suportar cada tipo de sponsor</h3>
      <div className="sponsor-item">
        <div className="color-box green"></div>
        <span className="sponsor-code">A1</span>
        <span className="sponsor-description">Coach</span>
      </div>
      <div className="sponsor-item">
        <div className="color-box yellow"></div>
        <span className="sponsor-code">A2</span>
        <span className="sponsor-description">Coach e melhorar competências</span>
      </div>
      <div className="sponsor-item">
        <div className="color-box red"></div>
        <span className="sponsor-code">A3</span>
        <span className="sponsor-description">Melhorar competências e depois coach</span>
      </div>
      <div className="sponsor-item">
        <div className="color-box red"></div>
        <span className="sponsor-code">B1</span>
        <span className="sponsor-description">Engajar</span>
      </div>
      <div className="sponsor-item">
        <div className="color-box red"></div>
        <span className="sponsor-code">B2, B3</span>
        <span className="sponsor-description">Engajar, melhorar competências e coach</span>
      </div>
    </div>
  );
};

export default SponsorKey;
