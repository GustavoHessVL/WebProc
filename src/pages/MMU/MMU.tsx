import React from "react";
import MmuComponent from "../../components/MmuComponent/MmuComponent";
import "./Style.css";

const MMU: React.FC = () => {
  return (
    <div className="container">
      <h1>MMU Learning</h1>
      {/* <p>MMU Learning</p> */}

      <div className="contentDiv">
        <div className="Text">
          <div className="section">
            <h2>Visão Geral do Gerenciador de Memória (MMU)</h2>
            <p>
              O Gerenciador de Memória (MMU) é fundamental em sistemas
              operacionais, responsável por traduzir endereços virtuais gerados
              pelas aplicações em endereços físicos na memória RAM. Esse
              processo permite que os programas operem em seus próprios espaços
              de endereçamento sem se preocuparem com a localização física dos
              dados. A MMU atua como uma camada intermediária entre a CPU e a
              memória física, utilizando tabelas de páginas para realizar essa
              tradução. Essas tabelas de páginas contêm mapeamentos que
              relacionam endereços virtuais a endereços físicos.
            </p>

            <h2>Organização das Tabelas de Páginas e o Papel do TLB</h2>
            <p>
              Um aspecto crucial do funcionamento da MMU é o uso de tabelas de
              páginas, que podem ser organizadas em diferentes níveis (como
              tabelas de páginas de nível único ou multi-nível). A MMU também
              utiliza o TLB (Translation Lookaside Buffer), uma cache especial
              que armazena mapeamentos de páginas acessados recentemente, o que
              acelera o processo de tradução de endereços virtuais para físicos,
              evitando a necessidade de acessar a tabela de páginas na memória
              principal repetidamente.
            </p>
          </div>
          <div className="section">
            {" "}
            <h2>Alinhamento de Páginas e Tabelas de Páginas</h2>
            <p>
              A MMU também deve garantir que as páginas de memória e as tabelas
              de páginas estejam devidamente alinhadas na memória física para
              funcionar corretamente. Por exemplo, páginas comuns devem ser
              alinhadas em 4096 bytes, com os 12 bits menos significativos do
              endereço sendo zero; páginas grandes devem ser alinhadas em 64
              KiB, com os 16 bits menos significativos sendo zero; seções devem
              ser alinhadas em 1 MiB, com os 20 bits menos significativos sendo
              zero; e seções grandes devem ser alinhadas em 16 MiB, com os 24
              bits menos significativos sendo zero. A tabela de páginas
              principal, conhecida como TTB (Translation Table Base), precisa
              ser alinhada em 16 KiB, garantindo que os 14 bits menos
              significativos do seu endereço sejam zero. Já as tabelas de
              páginas secundárias devem ser alinhadas em 1024 bytes, com os 10
              bits menos significativos sendo zero. Esses alinhamentos são
              fundamentais para o correto funcionamento do sistema de paginação
              e para garantir a eficiência na gestão da memória.
            </p>
            <h2>Proteção de Memória Implementada pela MMU</h2>
            <p>
              Além da tradução de endereços e do alinhamento, a MMU também
              desempenha um papel crucial na proteção de memória. Ela implementa
              permissões de acesso que ajudam a garantir que os processos não
              interfiram uns nos outros, reforçando a segurança e a estabilidade
              do sistema. Por exemplo, ela pode definir permissões de leitura,
              escrita e execução para diferentes regiões da memória, assegurando
              que um processo não possa acessar ou modificar dados de outro
              processo sem a devida autorização.
            </p>
          </div>
        </div>

        <div className="interactive">
          <div>
            <h2>Exploração Interativa do Funcionamento da MMU</h2>
            <MmuComponent />
          </div>
          {/* <div className="theory">{"oi"}</div> */}
        </div>
      </div>
    </div>
  );
};

export default MMU;
