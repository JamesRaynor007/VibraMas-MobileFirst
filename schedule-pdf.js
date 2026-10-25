/**
 * ============================================================================
 * VIBRA — PLANILLA DE HORARIOS INTERACTIVA Y GENERADOR DE PDF OFICIAL
 * ============================================================================
 * - Filtrado dinámico por disciplina y profesor
 * - Identificación por color único por profesora
 * - Generador de planilla imprimible y descargable en PDF con diseño editorial
 * ============================================================================
 */

(function() {
  'use strict';

  let currentDisciplineFilter = 'all';
  let currentTeacherFilter = 'all';

  function initScheduleSystem() {
    renderScheduleGrid();
    setupFilters();
    setupPdfDownloadButton();
  }

  function getTeacherById(id) {
    if (!window.VIBRA_CONFIG || !window.VIBRA_CONFIG.team) return null;
    return window.VIBRA_CONFIG.team.find(t => t.id === id);
  }

  function renderScheduleGrid() {
    const container = document.getElementById('scheduleGridContainer');
    if (!container || !window.VIBRA_CONFIG) return;

    const schedules = window.VIBRA_CONFIG.schedules || [];
    
    // Filtrado
    const filtered = schedules.filter(item => {
      // Filtro disciplina
      let matchDiscipline = true;
      if (currentDisciplineFilter !== 'all') {
        const typeLower = item.classType.toLowerCase();
        if (currentDisciplineFilter === 'yoga') {
          matchDiscipline = typeLower.includes('yoga') || typeLower.includes('vinyasa') || typeLower.includes('hatha') || typeLower.includes('yin');
        } else if (currentDisciplineFilter === 'pilates') {
          matchDiscipline = typeLower.includes('pilates');
        } else if (currentDisciplineFilter === 'movimiento') {
          matchDiscipline = typeLower.includes('movimiento') || typeLower.includes('stretching');
        }
      }

      // Filtro profesor
      let matchTeacher = true;
      if (currentTeacherFilter !== 'all') {
        matchTeacher = item.teacherId === currentTeacherFilter;
      }

      return matchDiscipline && matchTeacher;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="schedule-empty-state">
          <p>No se encontraron clases con los filtros seleccionados.</p>
          <button class="btn-reset-filters" id="btnResetFilters">Restablecer todos los filtros</button>
        </div>
      `;
      const resetBtn = document.getElementById('btnResetFilters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentDisciplineFilter = 'all';
          currentTeacherFilter = 'all';
          updateActiveFilterButtons();
          renderScheduleGrid();
        });
      }
      return;
    }

    // Agrupar por días
    const daysOrder = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let html = '<div class="schedule-days-grid">';

    daysOrder.forEach(dayName => {
      const dayClasses = filtered.filter(c => c.day === dayName);
      if (dayClasses.length === 0) return;

      html += `
        <div class="schedule-day-column">
          <div class="day-column-header">
            <h3 class="day-title">${dayName}</h3>
            <span class="day-class-count">${dayClasses.length} ${dayClasses.length === 1 ? 'práctica' : 'prácticas'}</span>
          </div>
          <div class="day-cards-list">
      `;

      dayClasses.forEach(c => {
        const teacher = getTeacherById(c.teacherId);
        const color = teacher ? teacher.colorTag : '#4F5E4B';
        const teacherName = teacher ? teacher.name : 'Profesora Invitada';

        html += `
          <article class="schedule-card" style="--teacher-accent: ${color};" data-teacher="${c.teacherId}">
            <div class="schedule-card-tag" style="background-color: ${color};"></div>
            <div class="schedule-card-body">
              <div class="schedule-time-row">
                <span class="schedule-time">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  ${c.time}
                </span>
                <span class="schedule-room">${c.room}</span>
              </div>
              <h4 class="schedule-class-name">${c.classType}</h4>
              <div class="schedule-teacher-row">
                <span class="teacher-color-dot" style="background-color: ${color};" title="Color de ${teacherName}"></span>
                <span class="teacher-name">${teacherName}</span>
              </div>
              <div class="schedule-actions-row">
                <a href="https://vibramas.store" target="_blank" rel="noopener noreferrer" class="btn-card-reserve">
                  <span>Reservar</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              </div>
            </div>
          </article>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;
  }

  function setupFilters() {
    const disciplineBtns = document.querySelectorAll('[data-filter-discipline]');
    const teacherBtns = document.querySelectorAll('[data-filter-teacher]');

    disciplineBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        disciplineBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDisciplineFilter = btn.getAttribute('data-filter-discipline');
        renderScheduleGrid();
      });
    });

    teacherBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        teacherBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTeacherFilter = btn.getAttribute('data-filter-teacher');
        renderScheduleGrid();
      });
    });
  }

  function updateActiveFilterButtons() {
    document.querySelectorAll('[data-filter-discipline]').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-filter-discipline') === currentDisciplineFilter);
    });
    document.querySelectorAll('[data-filter-teacher]').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-filter-teacher') === currentTeacherFilter);
    });
  }

  // Generador de Planilla PDF Oficial
  function setupPdfDownloadButton() {
    const downloadBtns = document.querySelectorAll('#btnDownloadSchedulePdf, .btn-download-pdf-trigger');
    downloadBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        triggerOfficialPdfDownload();
      });
    });
  }

  function triggerOfficialPdfDownload() {
    // Si el usuario quiere guardar en PDF, abrimos la ventana de render estilizada para impresión/guardado en PDF
    const printWindow = window.open('', '_blank', 'width=950,height=1100');
    if (!printWindow) {
      alert('Por favor permite ventanas emergentes para generar la planilla PDF oficial.');
      return;
    }

    const schedules = window.VIBRA_CONFIG.schedules || [];
    const team = window.VIBRA_CONFIG.team || [];

    // Generar tabla completa estructurada
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    let teacherLegendHtml = '';
    team.forEach(t => {
      teacherLegendHtml += `
        <div style="display: inline-flex; align-items: center; gap: 8px; margin-right: 20px; margin-bottom: 8px;">
          <span style="display:inline-block; width: 14px; height: 14px; border-radius: 4px; background-color: ${t.colorTag};"></span>
          <strong style="color: #262523; font-size: 13px;">${t.name}</strong>
          <span style="color: #666; font-size: 12px;">(${t.discipline})</span>
        </div>
      `;
    });

    let daysTableRows = '';
    days.forEach(day => {
      const dayClasses = schedules.filter(c => c.day === day);
      if (dayClasses.length === 0) return;

      daysTableRows += `
        <tr style="background-color: #F4EFE6;">
          <td colspan="4" style="padding: 10px 14px; font-weight: 700; color: #4F5E4B; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; border-top: 2px solid #6F7F6A;">
            ${day.toUpperCase()}
          </td>
        </tr>
      `;

      dayClasses.forEach(c => {
        const teacher = getTeacherById(c.teacherId);
        const color = teacher ? teacher.colorTag : '#4F5E4B';
        const teacherName = teacher ? teacher.name : 'Profesora';

        daysTableRows += `
          <tr style="border-bottom: 1px solid #E5DFD5;">
            <td style="padding: 10px 14px; font-weight: 600; color: #262523; font-size: 13px; width: 130px;">
              ${c.time}
            </td>
            <td style="padding: 10px 14px; font-weight: 600; font-size: 14px; color: #262523;">
              ${c.classType}
            </td>
            <td style="padding: 10px 14px; font-size: 13px; color: #444;">
              <span style="display:inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${color}; margin-right: 6px;"></span>
              <strong>${teacherName}</strong>
            </td>
            <td style="padding: 10px 14px; font-size: 12px; color: #666; text-align: right;">
              ${c.room}
            </td>
          </tr>
        `;
      });
    });

    const printableHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>VibraMas — Planilla de Horarios Semanales Oficial</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #262523;
            background: #FFFFFF;
            margin: 0;
            padding: 24px;
            font-size: 13px;
            line-height: 1.5;
          }
          .pdf-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            border-bottom: 3px solid #4F5E4B;
            padding-bottom: 16px;
            margin-bottom: 20px;
          }
          .pdf-brand-title {
            font-family: Georgia, serif;
            font-size: 32px;
            letter-spacing: 4px;
            color: #4F5E4B;
            margin: 0;
          }
          .pdf-brand-sub {
            font-size: 11px;
            letter-spacing: 2px;
            color: #7A7670;
            margin: 4px 0 0 0;
          }
          .pdf-info-right {
            text-align: right;
            font-size: 12px;
            color: #555;
          }
          .legend-box {
            background-color: #FAF8F5;
            border: 1px solid #E2DCD2;
            border-radius: 8px;
            padding: 14px 18px;
            margin-bottom: 22px;
          }
          .legend-title {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 700;
            color: #4F5E4B;
            margin-bottom: 8px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
          }
          .pdf-footer {
            margin-top: 30px;
            padding-top: 14px;
            border-top: 1px solid #E2DCD2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
            color: #777;
          }
          .btn-print-floating {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4F5E4B;
            color: white;
            padding: 10px 20px;
            border-radius: 30px;
            font-weight: bold;
            cursor: pointer;
            border: none;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-size: 14px;
          }
          @media print {
            .btn-print-floating { display: none; }
          }
        </style>
      </head>
      <body>
        <button class="btn-print-floating" onclick="window.print()">📥 Guardar como PDF / Imprimir</button>

        <header class="pdf-header">
          <div>
            <h1 class="pdf-brand-title">V I B R A</h1>
            <p class="pdf-brand-sub">MOVIMIENTO · BIENESTAR · PRESENCIA — NECOCHEA</p>
          </div>
          <div class="pdf-info-right">
            <strong>Planilla de Horarios Semanales Oficial</strong><br>
            Temporada 2026/2027 · Estudio Central<br>
            Reservas y Tienda: <em>vibramas.store</em>
          </div>
        </header>

        <section class="legend-box">
          <div class="legend-title">Profesores y Asignación de Color por Práctica:</div>
          <div style="display: flex; flex-wrap: wrap;">
            ${teacherLegendHtml}
          </div>
        </section>

        <table>
          <thead>
            <tr style="background-color: #4F5E4B; color: #FFFFFF; text-align: left;">
              <th style="padding: 9px 14px; font-size: 12px; border-radius: 4px 0 0 0;">Horario</th>
              <th style="padding: 9px 14px; font-size: 12px;">Disciplina / Práctica</th>
              <th style="padding: 9px 14px; font-size: 12px;">Profesora a Cargo</th>
              <th style="padding: 9px 14px; font-size: 12px; text-align: right; border-radius: 0 4px 0 0;">Espacio</th>
            </tr>
          </thead>
          <tbody>
            ${daysTableRows}
          </tbody>
        </table>

        <div style="background-color: #FAF8F5; border-left: 3px solid #C59B69; padding: 12px 16px; font-size: 12px; color: #4E4B46; margin-bottom: 20px;">
          <strong>Pautas Importantes de Asistencia:</strong> Llegar 10 minutos antes del inicio de la clase. Traer ropa cómoda de algodón, toalla personal y botella para hidratación. El estudio provee mats desinfectados, bolsters, tacos y mantas.
        </div>

        <footer class="pdf-footer">
          <div>
            VibraMas Necochea · Tel / WhatsApp de Administración verificado · Calle 62 e/ 65 y 67
          </div>
          <div>
            Generado digitalmente desde <strong>vibramas.com.ar</strong>
          </div>
        </footer>

        <script>
          // Abrir automáticamente el cuadro de diálogo de guardado en PDF
          window.onload = function() {
            setTimeout(() => {
              window.print();
            }, 600);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(printableHtml);
    printWindow.document.close();
  }

  // Inicializar al cargar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScheduleSystem);
  } else {
    initScheduleSystem();
  }
})();
