import { useEffect, useRef, useState, type FormEvent } from 'react';
import BrandMark from './components/BrandMark';
import FigmaFrame from './components/FigmaFrame';
import { Icon } from './components/Icons';
import { validateDeliveryQuantity } from './domain/deliveryRules';

type NavigationItem = {
  label: string;
  icon: 'overview' | 'families' | 'care' | 'stock' | 'stay';
};

const navigation: NavigationItem[] = [
  { label: 'Visão geral', icon: 'overview' },
  { label: 'Famílias', icon: 'families' },
  { label: 'Atendimentos', icon: 'care' },
  { label: 'Estoque e benefícios', icon: 'stock' },
  { label: 'Hospedagens', icon: 'stay' },
];

const demoActivity = [
  { icon: 'care' as const, title: 'Atendimento registrado', detail: 'Família Exemplo · Serviço social', time: 'Hoje, 09:40', tone: 'mint' },
  { icon: 'stock' as const, title: 'Estoque atualizado', detail: 'Cestas básicas · entrada de 12 un.', time: 'Ontem, 16:20', tone: 'blue' },
  { icon: 'stay' as const, title: 'Hospedagem organizada', detail: 'Família Exemplo 2 · Quarto 02', time: 'Ontem, 14:15', tone: 'amber' },
];

const demoBeneficiaries = [
  { id: 'ana', name: 'Ana Exemplo', family: 'Família Exemplo' },
  { id: 'joao', name: 'João Exemplo', family: 'Família Exemplo 2' },
] as const;

const demoItems = [
  { id: 'cesta', label: 'Cesta básica', availableStock: 5 },
  { id: 'leite', label: 'Leite integral', availableStock: 8 },
  { id: 'medicamento', label: 'Medicamento demonstrativo', availableStock: 3 },
] as const;

function App() {
  const [activeItem, setActiveItem] = useState('Visão geral');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('ana');
  const [selectedItem, setSelectedItem] = useState('cesta');
  const [formError, setFormError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hasOpenedDialog = useRef(false);
  const selectedBeneficiaryDetails = demoBeneficiaries.find((beneficiary) => beneficiary.id === selectedBeneficiary) ?? demoBeneficiaries[0];
  const selectedItemDetails = demoItems.find((item) => item.id === selectedItem) ?? demoItems[0];
  const remainingStock = selectedItemDetails.availableStock - Number(quantity);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (dialogOpen) {
      hasOpenedDialog.current = true;
      if (!dialog.open) dialog.showModal();
      requestAnimationFrame(() => {
        const focusTarget = dialog.querySelector<HTMLElement>(showResult ? '#result-heading' : '#demo-beneficiary');
        focusTarget?.focus();
      });
    } else {
      if (dialog.open) dialog.close();
      if (hasOpenedDialog.current) requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, [dialogOpen, showResult]);

  function resetSimulation() {
    setQuantity('1');
    setSelectedBeneficiary('ana');
    setSelectedItem('cesta');
    setFormError('');
    setShowResult(false);
  }

  function openDelivery() {
    resetSimulation();
    setDialogOpen(true);
    setNotice('');
  }

  function closeDelivery() {
    setDialogOpen(false);
    setShowResult(false);
    setFormError('');
  }

  function selectNavigation(item: string) {
    setMenuOpen(false);
    if (item === 'Registrar entrega') {
      openDelivery();
      return;
    }
    if (item === 'Visão geral') {
      setActiveItem(item);
      setNotice('');
      return;
    }
    setNotice(`“${item}” faz parte da navegação prevista. Esta tela é uma demonstração do menu inicial.`);
    setStatusMessage(`Seção ${item}. Esta é uma demonstração do menu inicial.`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateDeliveryQuantity(quantity, selectedItemDetails.availableStock);
    if (!validation.valid) {
      setFormError(validation.message);
      return;
    }
    setFormError('');
    setShowResult(true);
    setStatusMessage('Simulação concluída. Nenhum dado foi gravado.');
  }

  return (
    <FigmaFrame>
      <div className="app-shell">
        {menuOpen && <button className="mobile-scrim" type="button" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}
        <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`} aria-label="Navegação principal">
          <a className="brand-lockup" href="#inicio" onClick={() => selectNavigation('Visão geral')} aria-label="Organização Viver — visão geral">
            <BrandMark />
            <span className="brand-copy">
              <strong>Viver</strong>
              <span>Organização</span>
            </span>
          </a>

          <div className="sidebar-label">MENU PRINCIPAL</div>
          <nav className="primary-nav" aria-label="Seções do protótipo">
            {navigation.map((item) => (
              <button
                type="button"
                key={item.label}
                className={`nav-link ${activeItem === item.label ? 'nav-link--active' : ''}`}
                aria-current={activeItem === item.label ? 'page' : undefined}
                onClick={() => selectNavigation(item.label)}
              >
                <Icon name={item.icon} size={19} />
                <span>{item.label}</span>
                {item.label === 'Visão geral' && <span className="active-mark" aria-hidden="true" />}
              </button>
            ))}
          </nav>

          <div className="sidebar-spacer" />
          <div className="sidebar-note">
            <span className="sidebar-note-icon"><Icon name="spark" size={17} /></span>
            <div>
              <strong>Cuidado em rede</strong>
              <p>Organização que apoia cada etapa do acolhimento.</p>
            </div>
          </div>
          <div className="sidebar-footer">
            <span className="online-dot" aria-hidden="true" />
            <span>Ambiente de demonstração</span>
          </div>
        </aside>

        <div className="main-column">
          <header className="topbar">
            <button
              className="mobile-menu-button icon-button"
              type="button"
              aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={21} />
            </button>
            <div className="breadcrumb"><span>Organização Viver</span><Icon name="chevron" size={15} /><strong>Visão geral</strong></div>
            <div className="topbar-actions">
              <span className="demo-pill"><span className="demo-pill-dot" aria-hidden="true" /><span className="demo-pill-wide">Demonstração · dados fictícios</span><span className="demo-pill-compact">Dados fictícios</span></span>
              <div className="team-profile" aria-label="Perfil demonstrativo: Equipe Viver">
                <span className="avatar" aria-hidden="true">EV</span>
                <span className="team-profile-text"><strong>Equipe Viver</strong><small>Perfil demonstrativo</small></span>
              </div>
            </div>
          </header>

          <main id="inicio" className="main-content">
            <div className="welcome-row">
              <div>
                <p className="eyebrow">SEGUNDA-FEIRA, 16 DE NOVEMBRO</p>
                <h1>Painel de acolhimento</h1>
                <p className="welcome-subtitle">Um olhar organizado para cuidar melhor de cada família.</p>
              </div>
              <div className="welcome-mark" aria-hidden="true"><Icon name="spark" size={18} /><span>Informações para apoiar o cuidado</span></div>
            </div>

            {notice && (
              <div className="inline-notice" role="status">
                <span className="notice-symbol" aria-hidden="true">i</span>
                <p>{notice}</p>
                <button type="button" aria-label="Dispensar aviso" onClick={() => setNotice('')}><Icon name="close" size={17} /></button>
              </div>
            )}

            <section className="hero-card" aria-labelledby="hero-heading">
              <div className="hero-copy">
                <div className="hero-kicker"><span className="hero-kicker-dot" aria-hidden="true" /> ROTINA DE ACOLHIMENTO</div>
                <h2 id="hero-heading">Cuidado organizado,<br /><em>apoio que chega.</em></h2>
                <p>Registre benefícios e acompanhe os recursos destinados às famílias atendidas pela Viver.</p>
                <button className="primary-button" type="button" ref={triggerRef} onClick={openDelivery}>
                  <Icon name="plus" size={18} />
                  <span>Registrar entrega</span>
                  <Icon name="arrow" size={17} className="button-arrow" />
                </button>
                <span className="hero-hint">Alimentos, medicamentos e outros benefícios</span>
              </div>
              <div className="hero-art" aria-hidden="true">
                <div className="art-orbit art-orbit--one" />
                <div className="art-orbit art-orbit--two" />
                <div className="art-leaf art-leaf--one" />
                <div className="art-leaf art-leaf--two" />
                <div className="benefit-card benefit-card--back"><span className="mini-icon mini-icon--sun"><Icon name="care" size={18} /></span><i /><i /></div>
                <div className="benefit-card benefit-card--front">
                  <span className="benefit-icon"><Icon name="box" size={28} /></span>
                  <span className="benefit-lines"><i /><i /><i /></span>
                  <span className="benefit-check"><Icon name="check" size={14} /></span>
                </div>
                <span className="art-caption">Acompanhamento com cuidado</span>
              </div>
            </section>

            <section className="summary-section" aria-labelledby="summary-heading">
              <div className="section-heading-row">
                <div><h2 id="summary-heading">Visão do dia</h2><p>Um resumo dos fluxos acompanhados</p></div>
                <span className="fictional-note"><span aria-hidden="true">ⓘ</span> Números demonstrativos</span>
              </div>
              <div className="summary-grid">
                <article className="summary-card">
                  <span className="summary-icon summary-icon--green"><Icon name="families" size={19} /></span>
                  <div className="summary-text"><span>Famílias acompanhadas</span><strong>08</strong><small><span className="trend-dot" /> registros fictícios</small></div>
                  <span className="summary-arrow"><Icon name="chevron" size={16} /></span>
                </article>
                <article className="summary-card">
                  <span className="summary-icon summary-icon--blue"><Icon name="care" size={19} /></span>
                  <div className="summary-text"><span>Atendimentos na semana</span><strong>14</strong><small>Dados de demonstração</small></div>
                  <span className="summary-arrow"><Icon name="chevron" size={16} /></span>
                </article>
                <article className="summary-card">
                  <span className="summary-icon summary-icon--amber"><Icon name="stay" size={19} /></span>
                  <div className="summary-text"><span>Hospedagens organizadas</span><strong>02</strong><small>Dados de demonstração</small></div>
                  <span className="summary-arrow"><Icon name="chevron" size={16} /></span>
                </article>
              </div>
            </section>

            <section className="activity-section" aria-labelledby="activity-heading">
              <div className="section-heading-row activity-heading-row">
                <div><h2 id="activity-heading">Atividade recente</h2><p>Exemplos de registros no painel</p></div>
                <button className="text-link" type="button" onClick={() => selectNavigation('Atendimentos')}>Ver atividades <Icon name="arrow" size={16} /></button>
              </div>
              <div className="activity-list">
                {demoActivity.map((activity) => (
                  <article className="activity-row" key={activity.title}>
                    <span className={`activity-icon activity-icon--${activity.tone}`}><Icon name={activity.icon} size={17} /></span>
                    <div className="activity-copy"><strong>{activity.title}</strong><span>{activity.detail}</span></div>
                    <time>{activity.time}</time>
                  </article>
                ))}
              </div>
            </section>

            <footer className="content-footer">
              <span><span className="footer-leaf" aria-hidden="true">✳</span> Organização Viver <span className="footer-separator">·</span> Gestão do acolhimento</span>
              <span>Protótipo acadêmico · sem dados reais</span>
            </footer>
          </main>
        </div>

        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{statusMessage}</div>

        <dialog
          ref={dialogRef}
          className="delivery-dialog"
          aria-labelledby={showResult ? 'result-heading' : 'dialog-heading'}
          onCancel={(event) => { event.preventDefault(); closeDelivery(); }}
          onClick={(event) => { if (event.target === event.currentTarget) closeDelivery(); }}
        >
          <div className="dialog-panel">
            <button className="dialog-close icon-button" type="button" aria-label="Fechar registro" onClick={closeDelivery}><Icon name="close" size={19} /></button>
            {!showResult ? (
              <>
                <div className="dialog-symbol"><Icon name="box" size={22} /></div>
                <p className="dialog-eyebrow">SIMULAÇÃO · DADOS FICTÍCIOS</p>
                <h2 id="dialog-heading">Registrar entrega</h2>
                <p className="dialog-description">Confira as informações antes de simular a saída do benefício.</p>
                <form onSubmit={handleSubmit} noValidate>
                  <label htmlFor="demo-beneficiary">Beneficiário</label>
                  <select id="demo-beneficiary" value={selectedBeneficiary} onChange={(event) => { setSelectedBeneficiary(event.target.value); setFormError(''); }} autoFocus>
                    {demoBeneficiaries.map((beneficiary) => <option key={beneficiary.id} value={beneficiary.id}>{beneficiary.name} · {beneficiary.family}</option>)}
                  </select>
                  <label htmlFor="demo-item">Item</label>
                  <select id="demo-item" value={selectedItem} onChange={(event) => { setSelectedItem(event.target.value); setFormError(''); }}>
                    {demoItems.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                  </select>
                  <div className="quantity-row">
                    <label htmlFor="demo-quantity">Quantidade</label>
                    <span>Saldo disponível: <strong>{selectedItemDetails.availableStock} unidades</strong></span>
                  </div>
                  <input id="demo-quantity" type="number" min="1" max={selectedItemDetails.availableStock} step="1" value={quantity} onChange={(event) => { setQuantity(event.target.value); setFormError(''); }} aria-describedby={formError ? 'quantity-error' : 'quantity-help'} aria-invalid={Boolean(formError)} />
                  {formError ? <p id="quantity-error" className="field-error" role="alert"><span aria-hidden="true">!</span>{formError}</p> : <p id="quantity-help" className="field-help">A simulação aceita de 1 a {selectedItemDetails.availableStock} unidades.</p>}
                  <div className="demo-disclaimer"><span aria-hidden="true">ⓘ</span><p>Esta é uma demonstração. Nenhuma informação será salva.</p></div>
                  <div className="dialog-actions">
                    <button type="button" className="secondary-button" onClick={closeDelivery}>Cancelar</button>
                    <button type="submit" className="primary-button dialog-submit"><span>Confirmar simulação</span><Icon name="arrow" size={16} /></button>
                  </div>
                </form>
              </>
            ) : (
              <div className="result-state">
                <span className="result-check"><Icon name="check" size={27} /></span>
                <p className="dialog-eyebrow">SIMULAÇÃO CONCLUÍDA</p>
                <h2 id="result-heading" tabIndex={-1}>Simulação de entrega concluída</h2>
                <p className="dialog-description">{quantity} {Number(quantity) === 1 ? 'unidade' : 'unidades'} de {selectedItemDetails.label} para {selectedBeneficiaryDetails.name}.</p>
                <div className="result-stock"><span>Saldo demonstrativo atualizado</span><strong>{remainingStock} {remainingStock === 1 ? 'unidade' : 'unidades'}</strong></div>
                <p className="result-note">Nenhum dado foi gravado. Esta confirmação existe apenas no protótipo.</p>
                <div className="dialog-actions result-actions">
                  <button type="button" className="secondary-button" onClick={closeDelivery}>Voltar ao painel</button>
                  <button type="button" className="primary-button dialog-submit" onClick={resetSimulation}>Nova simulação</button>
                </div>
              </div>
            )}
          </div>
        </dialog>
      </div>
    </FigmaFrame>
  );
}

export default App;
