const data = `bgdbdsbsbsttldddzzwnzzmpzmmzmqqcgglrglgbbbtmtddrssjtjqqtrtqtqppcvcddswdwbwlblfljfljlhhpchcfcgfcfwfllfccjlcjllbvbgglccznzrnzzvfzvffvzvccnwnnrtrqtttzmmndnqnvvlwvvgcclplccbggcscqscqcnndwdlwlvlffdssrzrtttbvvqttfdfrddhthbblnlmlmqmhhpvpcpwpccmdddbcbcgctggsstwwbcwwqllchlcccfwccvjcjhhvggnvvcssjwjhhdvdhdcdhdqhhwrwcrwcrrjzjccqhhvnnrppsqqplqqcvczzlpprlrqqvpvwwstwwzqqsnqqsrqrlqlggzztzhhvbbcncwnwhwbbqpbqpqdqsqjqrjrddpjpwwvlwlnwwmpwwnmmzgzqqdcdnnqllghhzwhwwggljjwswgwffsbffbggzfzcfzczpptrrnwrrcqqcwqqdttzqzjzqqltlggwlglgwgrgfgnffgqffnlntlnlccjwjfjnfjnffqvfqfcfsslwswfwvfwfvflfhhntngnhggqbbsggchghfggcmgmsggshsmmqffjpjnngwwftwffgqqvmqqslqslqqdzqzhzbhhdzhhllnzzlmzzltlwwsmswwtswtssvqsqhssfdsdtdjdqqqrffqjffrzrppjpgjjpgpmmzbbrcbbprbpbnpbpcpsspqqfggclcpczzngznzvzlvvcwvwcwdwcddhdbdwdhwhllpjllrmmhbmbgmgmpmhpmpqmpprggvsgvsvbsbbqbmmjdjfddsnnqpnnphppsbpsbpsprpjjqhhvrhvvdhdjhdhwdhhdjjrlrbbzhbbjljhllttrccbdbffznnfmnfnvfvrvbblmltlmmlbmmdqmqnmqqmmhchvcvpccnrccqhccshchshzshschcffpwwbdbqbbjhbhmbhmmzzzcscddbsbnnpzpfzzrfrlrmmzzhshbbtjtbtzbbddrwwhchvhtvvmhvmmwssqqzrzdrdqqntnjnrjrbbgqgzgbzgbzgbzgbbqtbbbqjjgvglvlzlqlbbjwjddjtjbjffcsfsnsnpspgpnnglnngrgqgbqgqtgtfggczzmbbvqqrssdqssgrssdzzvjvccbbgcgppgwwtmwwrnwnfwwnnzmzvvvmnnvdddrmrbrtbrbrvrqqcbbgjgfjfcfttgrrjmrmrttbnnsrnsnzsnzztmtgtjgjljdjtjrtrddtbtjbtjbtthhtmmllngnhgnnhthssgffljlnjllfvlvslvsvwvcvfccgqqtsqtqggbjbtjjtjvjtvtvddttqzqczzcvvdtvthvvfrfmrrclrlflbbhhcllfbbcwwgmwmnmpmgpptnpnjpnjjbqjqjddfdfjjpzzjnnvzzwtwpwfppzhphbbmsbmsbmbqqfpfsscttfrtrzzrznrrrbgbdbtdbdjjsmjmttlbtthbttrprpjppsbsjbjcbclchlhhlttntznnzfnfgnncsncnmmdndnlnclnndqnqssbsjbbrzrtzztszzvnznqqpnpbpnpvnpnhpphvpvfvhhrvhrrpttctjcjvcvzcvcscttqptpffscfsccqhchhdcdczcnzcncnhccfrrbprpbpqppdccjhjvjmjpjmpjjvfvrrwppgjgjjdgdmgdggcpccbrrgssbsjbsjsfscfcvvcrvcrcttbtffpqphpchclccwhcwcbwccbzzlvzvffbrbrbjbwjjqvgtcfnhtjvrcwbfjdbvgtqbvmbtscwzrwdfmwtjvswgrvncmftgmppvlcwjpnpffggrmvgtfqgqmhbhpslfwdfvfmbfndrmgfhdbbtdgvnslzpdfvdttqjpcnbzsjcvrprgrhpglwfwtdcbgdsjhnqjntjnsjcgwccjnvvngfpvqwvnclcsvhmwsrccvbjnnrjspwqdvjpfnfvbsslngzpdgjrcsnqfvdlsqdhdllcndshglztgrrjnptqfvllshmhbgdszvmvqdntpgzdvhstgrppwpdtdqvzsfgqfrgmmjqcsjhvrlmnjvfjghlvwbnqcggpqtrjztfzshnqpzznvlqcmnzvrwqlcbnbpwmljpvdzhbvbgtdjlzflsvzlcqdnsgzfjlccvjclqlzdhqzzrscttjmrvjvcqzvtzqlmsssnfcfmvcgmqjjwdnhtvlqrgdvlbbrffmrpnfsmwwwbnwclrgbfnzlbqvjfqjlfvfnfrhdqstddwnwrmsdnvzwfjfgpwcrfqqzbdwwtzprvqtgvtzbttlhcdczlhvlgrbptztswftvnjmgrnbwpfwnztvqmqbznvnllgjmqrwprvwtnptlbfwbblzsblptwpdwgcvwsbmbrtqfvjsbzfvsfvpwfwbnnfcsddhsnwnvvqthjdgvzgjprtqmvhdqjqhgqppqqcpzfcwzcmrslftgrvbvdsdgfzfmvvcqzcszfwdvghdnlwwpddzdsqsdqvvrwhphbqvcbjbtnqgnqqdsqcmrllhmdvpffnqmrgfddjbrjwflshzswvjtmqgqmzvcnlctvdpjhzzlgpzgprjncrscnlmdhvdqpfllsqgstmssvlzmrtjmgwppfqjsrfmlnszdnhngzhtbbnsnvmtzpfsdcsvsvvjnfnzhrzmvlhrbslrsbgwwcvrzpgcnmjqnvgmzmlvpccrmggtzzhsdtbbcdnpdlnbztgjhttmqdhjphcrbgjtctqmgbfmflgqztztcjqvgsscrmwfbvnrnbgbjgqmwdzhwwnddwgrprhvlgftcbnwjqmcgczpbhfqcqzdbdwhmzfmgvcjdsfzdbrzjjvfrvftdblnlhpbqvdprnsjdpznbbgqpgnnjmcnsbszfwblthtwlwrdphjltclmqnbpcgngdnfpltttsrvdmhrcvlqfplqmqvslwgcbrwrmchscczrfgspwjtdqtlbddbsclrlbmhdzqdrgjfsgldfjmgcglbgjhmghntndqcbgqwmdvczbwgcctzvcrsqqctwwddfhhfhwlsrsljpnrlqtbdzprjbfrjgztwbpnfqnlftzcgrpmpcnljhscfbsqzbsgwqcgbvctnhswhrsmwjgcccdsnbscwllmpstpnrccjspnjqmtgcsgbjzpfvzjrhlvnfblqmcmgcrvnpchwhlsqsbhzhsgdvwmdcwphwccvzmmqqjrvqwphbnmddzcmggmbsqrhbcqmdlgvccbhhmhwdjhhhcwnffthmgfhpltqbhnvdqfrzjdvlppqhzfdgbzbrtfllsbvjjcgbwsbcmfrbjtvzqsntzdzprnpmfpfpgmfprlbcdqbdzjsfjbtczdpdnhlwdhmwsjtvmztbhdbbdgvrtbqsqbsnwjjhlslzcblrwlfpzqlvdvmgqhrpjmbjbntmjsjvgsmdsnctlgtnlqgfvhwqbjbrczpfzmzwgvrphfmnnhrlzwzgthzqnzzmptppzdszlcpjjvbpjbtjfrqtbnpnwsdglbbjftvngcghjlnsqwspmmfdpslsmqtpngbtvvrvbqqdsphfhvsnmhprfclnjmfrtqnlqcbmfrggbstwdbwsvtpvflvfgqltmqjpnfclbwtlwhmqrmzcrbztstgpjrdsnwpqrcnvvnnnszlrtpqjtsnbjrdcthrzrtccgcvnnlzfjlcdnzzqclvtncjbznrlpnzhvcwmrfrzpcldfmfzfpchlmddgvcfdqdhzzdtwhsfcvsthtmqgvhzdpjcgwsmrvwsnqmhdnfqdrrnmjwcpjjftfdhvwrwwtvptzfrmgffdcrhvcmccfqctswzzmlsjvdjzgjgndhmmrwvwmmtrnpgsnmtcqdbdpqjmcddcrbcfmmccnvsfhwtvfhsjfmlfttspfghpfggrffnrwjggqwggrmpzscprvdzmzhwjjcsmpsltzwgchttwpngrlptprqnjzzpbpbcvrclggtqwlcwdpjpnjrhtgqwsvhsswwqtlnglnqnvffrgmlbzthvnhrzvsvclgdmmjzrpfv`;

module.exports = {
  data,
};