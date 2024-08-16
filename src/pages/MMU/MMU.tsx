import React from "react";
import MmuComponent from "../../components/Mmucomponent/Mmucomponent";
import "./Style.css";

const MMU: React.FC = () => {
  return (
    <div className="container">
      <h1>WebProc Project</h1>
      <p>MMU Learning</p>

      <div className="contentDiv">
        <div>
          <p>
            O Gerenciador de Memória (MMU) é fundamental em sistemas
            operacionais, responsável por traduzir endereços virtuais gerados
            pelas aplicações em endereços físicos na memória RAM. Esse processo
            permite que os programas operem em seus próprios espaços de
            endereçamento sem se preocuparem com a localização física dos dados.
            A MMU atua como uma camada intermediária entre a CPU e a memória
            física, utilizando tabelas de páginas para realizar essa tradução.
            Essas tabelas de páginas contêm mapeamentos que relacionam endereços
            virtuais a endereços físicos.
          </p>
          <p>
            Um aspecto crucial do funcionamento da MMU é o uso de tabelas de
            páginas, que podem ser organizadas em diferentes níveis (como
            tabelas de páginas de nível único ou multi-nível). A MMU também
            utiliza o TLB (Translation Lookaside Buffer), uma cache especial que
            armazena mapeamentos de páginas acessados recentemente, o que
            acelera o processo de tradução de endereços virtuais para físicos,
            evitando a necessidade de acessar a tabela de páginas na memória
            principal repetidamente.
          </p>
          <p>
            A MMU também deve garantir que as páginas de memória e as tabelas de
            páginas estejam devidamente alinhadas na memória física para
            funcionar corretamente. Por exemplo, páginas comuns devem ser
            alinhadas em 4096 bytes, com os 12 bits menos significativos do
            endereço sendo zero; páginas grandes devem ser alinhadas em 64 KiB,
            com os 16 bits menos significativos sendo zero; seções devem ser
            alinhadas em 1 MiB, com os 20 bits menos significativos sendo zero;
            e seções grandes devem ser alinhadas em 16 MiB, com os 24 bits menos
            significativos sendo zero. A tabela de páginas principal, conhecida
            como TTB (Translation Table Base), precisa ser alinhada em 16 KiB,
            garantindo que os 14 bits menos significativos do seu endereço sejam
            zero. Já as tabelas de páginas secundárias devem ser alinhadas em
            1024 bytes, com os 10 bits menos significativos sendo zero. Esses
            alinhamentos são fundamentais para o correto funcionamento do
            sistema de paginação e para garantir a eficiência na gestão da
            memória.
          </p>
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
          <p>
            Em resumo, a MMU é vital para a operação eficiente e segura dos
            sistemas operacionais. Ela não apenas facilita o gerenciamento da
            memória, mas também garante que cada processo funcione em um
            ambiente de memória isolado, crucial para a estabilidade e segurança
            do sistema como um todo. Os alinhamentos exigidos para as páginas e
            tabelas de páginas, junto com a proteção de memória oferecida pela
            MMU, asseguram que o sistema funcione corretamente e com o melhor
            desempenho possível.
          </p>
        </div>
        <div className="interactive">
          <div>
            <MmuComponent />
          </div>
          <div className="theory">{"oi"}</div>
        </div>
      </div>
    </div>
  );
};

export default MMU;
