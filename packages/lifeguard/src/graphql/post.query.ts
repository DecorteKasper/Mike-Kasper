import gql from 'graphql-tag'

export const GET_POST_BY_NUMBER = gql`
query postByNumber($numberPost: Float!) {
  postByNumber(number: $numberPost) {
	uidRedderA
    uidRedderB
    uidRedderC
    uidRedderD
    uidRedderE
    uidRedderF
    uidRedderG
    uidEhbo1      
  }
}
`
export const ALL_POSTEN = gql`
query {
  posten {
    numberPost
    uidRedderA
    uidRedderB
    uidRedderD
    uidRedderE
    uidRedderF
    uidRedderG
	uidEhbo1
    uidEhbo2
  }
}`